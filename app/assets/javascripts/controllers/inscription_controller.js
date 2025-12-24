import { Controller } from '@hotwired/stimulus'
import * as btc from "@scure/btc-signer"
import { base64 } from "@scure/base"
import { RpcErrorCode } from "sats-connect"

import { fetchJSON, formatSats, requestSignPsbt } from '../utils/index.js'
import { Mempool } from '../../../models/mempool.js'

const BASE_TX_SIZE = 10.5
const PADDING = 546n

export default class extends Controller {
  static targets = ['form', 'connectButton', 'prepareButton', 'prepareSpinner', 'prepareLabel', 'buyButton', 'buySpinner', 'buyLabel', 'optionalPayment', 'fees', 'feeRate', 'fee', 'total', 'successPanel', 'successTitle', 'successLink', 'errorPanel', 'errorTitle', 'errorMessage']
  static values = { price: Number, paymentAddress: String, inscriptionMetadata: Object }

  #utxos = []
  #mempoolFees = []
  #prepared = false

  connect() {
    this.walletConnectedRun = false
    this.txid = null

    if (Wallet.connected && Wallet.provider === 'unisat') {
      const checkUnisat = setInterval(() => {
        if (window.unisat) {
          clearInterval(checkUnisat)
          this.onWalletConnected()
        }
      }, 10)
    } else if (Wallet.connected) {
      this.onWalletConnected()
    }
  }

  onWalletConnected() {
    if (this.walletConnectedRun) return
    this.walletConnectedRun = true

    this.prepare()
  }

  onWalletDisconnected() {
    window.location.reload()
  }

  async prepare() {
    this.#disableForm()
    this.#hideError()
    this.#setPreparingState()

    try {
      await Promise.all([
        this.#loadUTXOs(),
        this.#loadMempoolFees(),
      ])

      this.#setBuyState()

      this.#prepared = true
      await this.calculateCost()
    } catch (error) {
      this.#prepared = false
      this.#showError({ title: 'Prepare Failed', error })
      this.#resetPrepareButton()
    } finally {
      this.#enableForm()
    }
  }

  async #loadMempoolFees() {
    this.#mempoolFees = await Mempool.feeEstimates()
  }

  async #loadUTXOs() {
    this.#utxos = await Wallet.fetchUTXOs()
  }

  async buy() {
    this.#disableForm()
    this.#hideError()
    this.#setBuyingState()

    try {
      const { psbt, signInputs } = this.#constructPurchaseTx()
      const response = await requestSignPsbt({ psbt, signInputs })

      if (response.status === "success") {
        const slug = window.location.pathname.split('/').filter(Boolean)[0]

        const executeResponse = await fetch(`/agent/sell/${encodeURIComponent(slug)}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inscriptionId: this.inscriptionMetadataValue.id,
            signedPsbt: response.result.psbt
          })
        })

        const data = await executeResponse.json()
        if (!executeResponse.ok) {
          this.#resetBuyButton()
          this.#enableForm()

          if (data.code === 'fee_too_low') {
            await this.#loadMempoolFees()
            await this.calculateCost()
            this.#showError({ title: 'Fee rate too low', error: data.error })
          } else {
            throw new Error(String(data.error))
          }
        } else {
          this.txid = data?.order?.txid ? String(data.order.txid) : null
          this.#setSuccessState()
        }
      } else {
        this.#resetBuyButton()
        this.#enableForm()

        if (response.error.code !== RpcErrorCode.USER_REJECTION) {
          this.#showError({ title: 'Purchase Failed', error: response.error.message })
        }
      }  
    } catch (error) {
      this.#showError({ title: 'Purchase Failed', error })
      this.#resetBuyButton()
      this.#enableForm()
    }
  }

  #constructPurchaseTx() {
    const { selectedUTXOs, networkFees, satsRequired } = this.#determineFeesAndUTXOs()

    const tx = new btc.Transaction()

    const [txid, vout, _offset] = this.inscriptionMetadataValue.satpoint.split(':')

    const decodedInscriptionAddress = btc.Address().decode(this.inscriptionMetadataValue.address)
    const inscriptionScript = btc.OutScript.encode(decodedInscriptionAddress)

    tx.addInput({
      txid: txid,
      index: parseInt(vout),
      sequence: 4294967293,
      witnessUtxo: { script: inscriptionScript, amount: BigInt(this.inscriptionMetadataValue.value) },
    })

    let inputValue = BigInt(0)
    let inputIndex = 1
    let paymentWalletInputs = []

    for (const utxo of selectedUTXOs) {
      tx.addInput({
        txid: utxo.txid,
        index: utxo.vout,
        witnessUtxo: { script: Wallet.paymentScript, amount: BigInt(utxo.value) },
        redeemScript: Wallet.paymentRedeemScript,
        witnessScript: Wallet.paymentWitnessScript,
        tapInternalKey: Wallet.paymentTapInternalKey,
        sequence: 4294967293
      })

      inputValue += BigInt(utxo.value)

      paymentWalletInputs.push(inputIndex)
      inputIndex += 1
    }

    const inscriptionPaddingSats = this.inscriptionMetadataValue.value >= 330 ? this.inscriptionMetadataValue.value : 330n

    tx.addOutputAddress(Wallet.ordinalAddress.address, BigInt(inscriptionPaddingSats))
    tx.addOutputAddress(this.paymentAddressValue, BigInt(this.priceValue))

    const optionalPayments = this.#selectedOptionalPayments()
    for (const optionalPayment of optionalPayments) {
      tx.addOutputAddress(optionalPayment.address, BigInt(optionalPayment.amount))
    }

    const changeAmount = inputValue - BigInt(satsRequired)
    if (changeAmount >= PADDING) tx.addOutputAddress(Wallet.paymentAddress.address, changeAmount)

    const psbt = tx.toPSBT()
    const signInputs = { [ Wallet.paymentAddress.address ]: paymentWalletInputs }

    return { psbt, signInputs }
  }

  async calculateCost() {
    if (!this.#prepared) return false

    try {
      this.#hideError()

      const { selectedUTXOs, networkFees, satsRequired } = this.#determineFeesAndUTXOs()

      this.feeRateTarget.textContent = `${this.#networkFeeRate} sat/vB`
      this.feeTarget.textContent = formatSats(networkFees)
      this.totalTarget.textContent = formatSats(satsRequired)

      const totalUsd = this.element.querySelector('[data-usd-role="total"]')
      if (totalUsd) totalUsd.setAttribute('data-usd-sats', String(satsRequired))

      return true
    } catch (error) {
      console.log(error)
      this.#showError({ title: 'Something went wrong', error })
      return false
    }
  }

  #selectedOptionalPayments() {
    const selected = []

    for (const checkbox of this.optionalPaymentTargets) {
      if (!checkbox.checked) continue
      selected.push(JSON.parse(checkbox.dataset.payment))
    }

    return selected
  }

  #determineFeesAndUTXOs() {
    let txSize = BASE_TX_SIZE

    txSize += Wallet.calculateInputSize(this.inscriptionMetadataValue.address)
    txSize += Wallet.calculateOutputSize(this.paymentAddressValue)
    txSize += Wallet.paymentUTXOOutputSize + Wallet.ordinalUTXOOutputSize

    const optionalPayments = this.#selectedOptionalPayments()

    for (const optionalPayment of optionalPayments) {
      txSize += Wallet.calculateOutputSize(optionalPayment.address)
    }

    let selectedUTXOs = []

    let networkFees = Math.ceil(txSize * this.#networkFeeRate)
    let totalAvailableSats = BigInt(0)

    const additionalPaddingSats = Math.max(0, 330 - this.inscriptionMetadataValue.value)
    const optionalPaymentsSats = optionalPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const baseRequiredSats = this.priceValue + additionalPaddingSats + optionalPaymentsSats

    let satsRequired = baseRequiredSats + networkFees

    if (totalAvailableSats < BigInt(satsRequired)) {
      for (const utxo of this.#utxos) {
        selectedUTXOs.push(utxo)
        totalAvailableSats += BigInt(utxo.value)

        txSize += Wallet.paymentUTXOInputSize
        networkFees = Math.ceil(txSize * this.#networkFeeRate)
        satsRequired = baseRequiredSats + networkFees

        if (totalAvailableSats >= BigInt(satsRequired)) break
      }
    }

    if (totalAvailableSats < BigInt(satsRequired)) throw new Error('Insufficient funds: Not enough available sats to complete the purchase')

    return { selectedUTXOs, networkFees, satsRequired }
  }

  get #networkFeeRate() {
    const raw = parseFloat(this.#mempoolFees["1"])
    const feeRate = (Math.floor(raw * 10) + 1) / 10

    return feeRate.toFixed(2)
  }

  #setPreparingState() {
    this.prepareButtonTarget.disabled = true
    this.prepareSpinnerTarget.classList.remove('button-spinner-hidden')
    this.prepareLabelTarget.textContent = 'Preparing…'
  }

  #setBuyState() {
    this.prepareButtonTarget.classList.remove('show-on-connected')
    this.prepareButtonTarget.classList.add('hidden')

    this.buyButtonTarget.classList.remove('hidden', 'purchase-success')
    this.buyButtonTarget.classList.add('inline-flex')
    this.buyButtonTarget.disabled = false
    this.buySpinnerTarget.classList.add('button-spinner-hidden')
    this.buyLabelTarget.textContent = 'Complete Purchase'
    this.successPanelTarget.classList.add('hidden')
  }

  #setBuyingState() {
    this.buyButtonTarget.disabled = true
    this.buySpinnerTarget.classList.remove('button-spinner-hidden')
    this.buyLabelTarget.textContent = 'Purchasing…'
  }

  #setSuccessState() {
    this.buyButtonTarget.disabled = true
    this.buySpinnerTarget.classList.add('button-spinner-hidden')
    this.buyLabelTarget.textContent = 'Purchase Completed'
    this.buyButtonTarget.classList.add('purchase-success')

    this.successPanelTarget.classList.remove('hidden')
    this.successLinkTarget.href = `https://mempool.space/tx/${this.txid}`
  }

  #resetPrepareButton() {
    this.prepareButtonTarget.disabled = false
    this.prepareSpinnerTarget.classList.add('button-spinner-hidden')
    this.prepareLabelTarget.textContent = 'Prepare Purchase'
  }

  #resetBuyButton() {
    this.buyButtonTarget.disabled = false
    this.buySpinnerTarget.classList.add('button-spinner-hidden')
    this.buyLabelTarget.textContent = 'Complete Purchase'
    this.buyButtonTarget.classList.remove('purchase-success')
  }

  #disableForm() {
    this.formTarget.classList.add('opacity-50', 'pointer-events-none')
  }

  #enableForm() {
    this.formTarget.classList.remove('opacity-50', 'pointer-events-none')
  }

  #hideError() {
    this.errorPanelTarget.classList.add('hidden')
  }

  #showError({ title, error }) {
    const stack = error?.stack ? String(error.stack) : null
    if (stack) console.error(stack)
    else console.error(error)

    const message = error?.message ? String(error.message) : String(error)

    this.errorTitleTarget.textContent = title
    this.errorMessageTarget.textContent = message
    this.errorPanelTarget.classList.remove('hidden')
  }

  #randomTxid() {
    const bytes = new Uint8Array(32)
    crypto.getRandomValues(bytes)
    let out = ''
    for (const b of bytes) out += b.toString(16).padStart(2, '0')
    return out
  }
}
