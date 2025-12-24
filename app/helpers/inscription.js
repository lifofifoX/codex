import { renderPage } from '../themes/theme.js'
import { assets } from '../../generated/assets.js'

export function renderInscription({ config, inscription, parentInscription, order }) {
  return renderPage({
    viewName: 'inscription.html',
    vars: {
      title: inscription.title,
      assets,
      config,
      inscription,
      parentInscription,
      order,
      checkout: {
        priceSats: config.price_sats
      }
    }
  })
}

