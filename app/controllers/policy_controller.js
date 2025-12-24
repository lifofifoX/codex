import { POLICY, POLICY_YAML } from '../config.js'
import { StoreWallet } from '../models/store_wallet.js'
import { renderPolicy } from '../helpers/policy.js'
import { htmlResponse } from './html_response.js'

export function policyController(c) {
  const wallet = StoreWallet.fromEnv(c.env)
  const walletAddress = wallet.taprootAddress

  const html = renderPolicy({ policy: POLICY, policyYaml: POLICY_YAML, walletAddress })
  return htmlResponse(c, html)
}
