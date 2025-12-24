import * as btc from "@scure/btc-signer"
import { Mempool } from "../../../../models/mempool.js"

const SUPPORTED_ADDRESS_TYPES = ["tr", "wpkh"]

export default class Unisat {
  provider = 'unisat'

  async authorize() {
    const response = await window.unisat.requestAccounts()
    let publicKey = await window.unisat.getPublicKey()

    const address = response[0]
    const addressType = btc.Address().decode(address)['type']

    if (addressType === "tr") publicKey = publicKey.slice(2)

    if (!SUPPORTED_ADDRESS_TYPES.includes(addressType)) {
      return Promise.reject("Address type is not supported")
    } else {
      return Promise.resolve([{ type: addressType, address, publicKey }])
    }
  }

  getPaymentAddress(addresses) {
    return addresses[0]
  }

  getOrdinalAddress(addresses) {
    return addresses[0]
  }

  async fetchUTXOs(address) {
    const [mempoolUtxos, unisatUtxos] = await Promise.all([
      Mempool.addressUTXOs(address),
      window.unisat.getBitcoinUtxos()
    ])

    const confirmedUTXOs = new Set(mempoolUtxos.filter(utxo => utxo.status.confirmed).map(utxo => `${utxo.txid}:${utxo.vout}`))

    return unisatUtxos
      .filter(utxo => confirmedUTXOs.has(`${utxo.txid}:${utxo.vout}`))
      .map(utxo => ({
        txid: utxo.txid,
        vout: utxo.vout,
        value: utxo.satoshis,
        status: { confirmed: true }
      }))
  }
}

