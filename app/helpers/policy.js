import { renderPage } from '../themes/theme.js'
import { assets } from '../../generated/assets.js'

export function renderPolicy({ policy, policyYaml, walletAddress }) {
  return renderPage({
    viewName: 'policy.html',
    vars: {
      title: 'Policy',
      assets,
      policy,
      policyYaml,
      walletAddress
    }
  })
}


