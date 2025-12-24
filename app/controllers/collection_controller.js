import { Collection } from '../models/collection.js'
import { renderCollection } from '../helpers/collection.js'
import { htmlResponse } from './html_response.js'
import { getActiveOrdersForInscriptions } from '../models/db/orders.js'

function parsePageParam(c) {
  const page = c.req.query('page')
  if (!page) return null

  return page
}

export async function collectionController(c) {
  const page = parsePageParam(c)
  const slug = c.req.param('collection')
  const db = c.env.DB

  let collection
  try {
    collection = Collection.lookup(slug)
  } catch {
    return c.text('Not Found', 404)
  }

  const pageData = await collection.listAvailablePage({ db, page })
  const orders = await getActiveOrdersForInscriptions({ db, inscriptionIds: (pageData.inscriptions ?? []).map((i) => i.id) })
  
  const ordersByInscriptionId = {}
  for (const order of orders) {
    ordersByInscriptionId[order.inscription_id] = order
  }

  const parentInscription = await collection.parentInscription({ db })
  const html = renderCollection({ config: collection.policy, pageData, page, pathname: c.req.path, collection, parentInscription, ordersByInscriptionId })

  return htmlResponse(c, html, { cacheControl: 'public, max-age=0, s-maxage=30' })
}
