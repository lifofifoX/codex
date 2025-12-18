import { CONFIG } from '../config.js'
import { createOrdClient } from '../models/ord_client.js'
import { renderStorefront } from '../models/pages/storefront.js'
import { htmlResponse } from './html_response.js'

function parseCursorParam(c) {
  const cursor = c.req.query('cursor')
  if (!cursor) return null
  return cursor
}

export async function storefrontController(c) {
  const ord = createOrdClient({ baseUrl: CONFIG.ord_api_base_url })
  const cursor = parseCursorParam(c)

  const page = await ord.listInscriptionsByAddress({ address: CONFIG.store_address, cursor, limit: CONFIG.page_size })
  const html = renderStorefront({ config: CONFIG, page, cursor, pathname: c.req.path })
  return htmlResponse(c, html)
}
