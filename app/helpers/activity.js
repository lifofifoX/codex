import { renderPage } from '../themes/theme.js'
import { assets } from '../../generated/assets.js'

export function renderActivity({ config, orders }) {
  return renderPage({
    viewName: 'activity.html',
    vars: {
      title: 'Activity',
      assets,
      config,
      orders
    }
  })
}


