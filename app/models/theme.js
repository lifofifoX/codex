import { themes } from '../../generated/themes.js'
import { CONFIG } from '../config.js'

function currentTheme() {
  return themes[CONFIG.theme] ?? themes.default
}

export function renderPage({ viewName, vars }) {
  const theme = currentTheme()
  const layout = theme['layout.html']
  const view = theme[viewName]
  if (!layout) throw new Error('Missing layout.html')
  if (!view) throw new Error(`Missing view: ${viewName}`)

  const viewVars = { ...vars, CONFIG }
  const body = view(viewVars)
  return layout({ ...viewVars, body })
}

export function renderCard({ vars }) {
  const theme = currentTheme()
  const card = theme['partials/inscription-card.html']
  if (!card) throw new Error('Missing partials/inscription-card.html')
  return card({ ...vars, CONFIG })
}
