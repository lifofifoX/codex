import { renderCard, renderPage } from '../themes/theme.js'
import { assets } from '../../generated/assets.js'

export function renderCollection({ config, pageData, page, pathname, collection, parentInscription, ordersByInscriptionId = {} }) {
  const inscriptions = pageData.inscriptions ?? []
  const itemsHtml = inscriptions
    .map((inscription) =>
      renderCard({
        vars: {
          inscription,
          collection: collection.policy,
          order: ordersByInscriptionId[inscription.id]
        }
      })
    )
    .join('')

  const nextUrl = pageData.nextPage ? buildPageUrl({ pathname, page: pageData.nextPage }) : ''
  const prevUrl = pageData.prevPage ? buildPageUrl({ pathname, page: pageData.prevPage }) : ''

  const pageDisplay = page ?? '1'
  const currentPage = Number(pageDisplay)
  const currentPageSafe = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1

  const pages = buildPagination({
    totalPages: pageData.totalPages,
    currentPage: currentPageSafe,
    pathname
  })

  return renderPage({
    viewName: 'inscriptions.html',
    vars: {
      title: collection.title,
      assets,
      config,
      collection: { ...collection.policy, itemsHtml, itemsCount: inscriptions.length },
      parentInscription,
      pagination: {
        nextUrl,
        prevUrl,
        pages,
        page: pageDisplay,
        totalPages: pageData.totalPages,
        hasPrev: Boolean(prevUrl),
        hasNext: Boolean(nextUrl)
      }
    }
  })
}

function buildPagination({ totalPages, currentPage, pathname }) {
  const leftEdge = [1, 2]
  const rightEdge = [totalPages - 1, totalPages]
  const window = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]

  const nums = new Set()
  for (const n of [...leftEdge, ...window, ...rightEdge]) {
    if (n >= 1 && n <= totalPages) nums.add(n)
  }

  const sorted = [...nums].sort((a, b) => a - b)
  const items = []
  let prev = null

  for (const n of sorted) {
    if (prev !== null && n - prev > 1) items.push({ type: 'gap' })
    items.push({
      type: 'page',
      n,
      url: buildPageUrl({ pathname, page: String(n) }),
      isActive: n === currentPage
    })
    prev = n
  }

  return items
}

function buildPageUrl({ pathname, page }) {
  const [path, search = ''] = String(pathname).split('?')
  const params = new URLSearchParams(search)

  if (page) params.set('page', page)
  else params.delete('page')

  const qs = params.toString()
  return qs ? `${path}?${qs}` : path
}
