import { renderCard, renderPage } from '../theme.js'
import { assets } from '../../../generated/assets.js'

export function renderStorefront({ config, page, cursor, pathname }) {
  const itemsHtml = (page.items ?? [])
    .map((it) =>
      renderCard({
        vars: {
          item: {
            ...it,
            link: `/inscriptions/${encodeURIComponent(it.id ?? '')}`
          }
        }
      })
    )
    .join('')

  const nextUrl = page.nextCursor ? buildPageUrl({ pathname, cursor: page.nextCursor }) : ''
  const prevUrl = page.prevCursor ? buildPageUrl({ pathname, cursor: page.prevCursor }) : ''

  const cursorDisplay = cursor ?? '1'
  const btnBase =
    'inline-flex items-center border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold tracking-tight text-white/85 hover:border-white/20 hover:bg-white/[0.05]'
  const btnYellow =
    'inline-flex items-center border border-synth-yellow/35 bg-synth-yellow/10 px-4 py-2 text-sm font-semibold tracking-tight text-white/90 hover:bg-synth-yellow/15'

  return renderPage({
    viewName: 'inscriptions.html',
    vars: {
      title: 'Store',
      assets,
      config,
      storefront: { itemsHtml },
      pagination: {
        nextUrl,
        prevUrl,
        cursor: cursorDisplay,
        prevClass: prevUrl ? btnBase : `${btnBase} invisible`,
        nextClass: nextUrl ? btnYellow : `${btnYellow} invisible`
      }
    }
  })
}

function buildPageUrl({ pathname, cursor }) {
  const url = new URL('https://example.local' + pathname)
  if (cursor) url.searchParams.set('cursor', cursor)
  return url.pathname + url.search
}
