import { renderPage } from '../theme.js'
import { assets } from '../../../generated/assets.js'

export function renderInscription({ config, inscription, buyAction, buyError }) {
  const priceSatsFormatted = new Intl.NumberFormat('en-US').format(config.price_sats)

  return renderPage({
    viewName: 'inscription.html',
    vars: {
      title: inscription?.title ? inscription.title : `Inscription ${inscription?.id}`,
      assets,
      config,
      inscription,
      checkout: {
        priceSats: config.price_sats,
        priceSatsFormatted,
        estimatedVbytes: config.estimated_vbytes,
        feeRateDefault: config.fee_rate_sat_vb_default
      },
      buy: {
        action: buyAction,
        error: buyError ?? '',
        errorClass: buyError ? '' : 'hidden'
      }
    }
  })
}
