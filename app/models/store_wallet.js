import * as btc from "@scure/btc-signer"
import { hex } from "@scure/base"
import { pubSchnorr } from '@scure/btc-signer/utils.js'

export class StoreWallet {
  #p2tr
  privateKey

  static fromEnv(env) {
    const privateKey = env.SELLING_WALLET_PRIVATE_KEY
    if (!privateKey) throw new Error("Missing SELLING_WALLET_PRIVATE_KEY")

    return new StoreWallet({ privateKey })
  }

  constructor({ privateKey }) {
    this.privateKey = privateKey
    this.#p2tr = btc.p2tr(pubSchnorr(hex.decode(privateKey)))
  }

  get taprootAddress() {
    return this.#p2tr.address
  }

  get tapInternalKey() {
    return this.#p2tr.tapInternalKey
  }
}
