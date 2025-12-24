import { AddressPurpose, request } from 'sats-connect'
import { fetchJSON } from '../../utils/index.js'
import { Mempool } from '../../../../models/mempool.js'

export default class Xverse {
  async authorize() {
    const response = await request("wallet_connect", {
      addresses: ['ordinals', 'payment'],
      message: "CODEX"
    })

    if (response.status === "success") {
      let addresses = response.result.addresses

      addresses = addresses.map(addr => {
        if (addr.addressType === 'p2tr' && addr.publicKey?.length === 66) {
          addr.publicKey = addr.publicKey.slice(2)
        }

        return addr
      })

      return Promise.resolve(addresses)
    } else {
      return Promise.reject(response.error)
    }
  }

  getPaymentAddress(addresses) {
    return addresses.find(address => address.purpose === AddressPurpose.Payment)
  }

  getOrdinalAddress(addresses) {
    return addresses.find(address => address.purpose === AddressPurpose.Ordinals)
  }

  async fetchUTXOs(address) {
    const [utxos, ordApiOutpoints] = await Promise.all([
      Mempool.addressUTXOs(address),
      fetchJSON(`${CONFIG.ord_api_url}/outputs/${address}?type=inscribed`)
    ])

    const inscriptionOutpoints = ordApiOutpoints.map(output => output.outpoint)

    return utxos
      .filter(tx => tx.status.confirmed)
      .filter(tx => !inscriptionOutpoints.includes(`${tx.txid}:${tx.vout}`))
      .sort((a, b) => b.value - a.value)
  }
}
