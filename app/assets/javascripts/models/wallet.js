import Unisat from './wallet/unisat.js'
import Xverse from './wallet/xverse.js'

const LS_PROVIDER = 'wallet_provider'
const LS_ADDRESSES = 'wallet_addresses'

import * as btc from "@scure/btc-signer"
import { hex } from "@scure/base"

export default class Wallet {
  #delegate

  constructor() {
    try {
      if (this.connected && this.provider) this.setup(this.provider)
    } catch (error) {
      console.error(error)
      this.reset()
    }
  }

  setup(provider) {
    switch(provider) {
      case "xverse":
        this.#delegate = new Xverse()
        break
      case "unisat":
        this.#delegate = new Unisat()
        break
      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }
  }

  authorize() {
    return this.#delegate.authorize()
  }

  async fetchUTXOs() {
    return this.#delegate.fetchUTXOs(this.paymentAddress.address)
  }

  get displayName() {
    return this.#delegate.constructor.name
  }

  get isXverse() {
    return this.provider === "xverse"
  }

  get isUnisat() {
    return this.provider === "unisat"
  }

  save(addresses) {
    localStorage.setItem(LS_PROVIDER, this.#delegate.constructor.name.toLowerCase())
    localStorage.setItem(LS_ADDRESSES, addresses)
  }

  reset() {
    localStorage.removeItem(LS_PROVIDER)
    localStorage.removeItem(LS_ADDRESSES)
  }

  get connected() {
    return this.#addresses?.length > 0
  }

  get provider() {
    return localStorage.getItem(LS_PROVIDER)
  }

  get paymentAddress() {
    return this.#delegate.getPaymentAddress(this.#addresses)
  }

  get ordinalAddress() {
    return this.#delegate.getOrdinalAddress(this.#addresses)
  }

  get paymentScript() {
    return btc.OutScript.encode(this.#decodedPaymentAddress)
  }

  get paymentRedeemScript() {
    return this.#paymentP2sh?.redeemScript
  }

  get paymentWitnessScript() {
    return this.#paymentP2sh?.witnessScript
  }

  get #paymentP2sh() {
    if (this.isLegacyPaymentAddress()) {
      const paymentP2wpkh = btc.p2wpkh(hex.decode(this.paymentAddress.publicKey))
      return btc.p2sh(paymentP2wpkh)
    }
  }

  isLegacyPaymentAddress() {
    return this.#decodedPaymentAddress.type === 'sh'
  }

  isTaprootPaymentAddress() {
    return this.#decodedPaymentAddress.type === 'tr'
  }

  get paymentTapInternalKey() {
    if (this.isTaprootPaymentAddress()) return hex.decode(this.paymentAddress.publicKey)
  }

  get #decodedPaymentAddress() {
    return btc.Address().decode(this.paymentAddress.address)
  }

  get paymentUTXOInputSize() {
    return this.calculateInputSize(this.paymentAddress.address)
  }

  get paymentUTXOOutputSize() {
    return this.calculateOutputSize(this.paymentAddress.address)
  }

  get ordinalUTXOInputSize() {
    return this.calculateInputSize(this.ordinalAddress.address)
  }

  get ordinalUTXOOutputSize() {
    return this.calculateOutputSize(this.ordinalAddress.address)
  }

  calculateInputSize(address) {
    if (address.startsWith('1')) return 148
    else if (address.startsWith('3')) return 91
    else if (address.startsWith('bc1p')) return 57.50
    else if (address.startsWith('bc1q')) return 67.75
    else throw new Error(`Unknown address type: ${address}`)
  }

  calculateOutputSize(address) {
    if (address.startsWith('1')) return 34
    else if (address.startsWith('3')) return 32
    else if (address === 'bc1pfeessrawgf') return 13
    else if (address.startsWith('bc1p')) return 43
    else if (address.startsWith('bc1q')) return address.length > 42 ? 43 : 31
    else throw new Error(`Unknown address type: ${address}`)
  }

  get #addresses() {
    try {
      return JSON.parse(localStorage.getItem(LS_ADDRESSES))
    } catch (error) {
      return []
    }
  }
}
