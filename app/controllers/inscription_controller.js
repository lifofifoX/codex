import { CONFIG } from '../config.js'
import { createOrdClient } from '../models/ord_client.js'
import { renderInscription } from '../models/pages/inscription.js'
import { htmlResponse } from './html_response.js'

export async function showInscriptionController(c) {
  const id = c.req.param('id')

  const ord = createOrdClient({ baseUrl: CONFIG.ord_api_base_url })
  const item = await ord.getInscription({ id })

  const buyAction = `/inscriptions/${encodeURIComponent(id)}/buy`
  const html = renderInscription({ config: CONFIG, inscription: { ...item.inscription, id }, buyAction })
  return htmlResponse(c, html)
}

export async function buyInscriptionController(c) {
  const id = c.req.param('id')

  const buyAction = `/inscriptions/${encodeURIComponent(id)}/buy`
  const inscription = {
    id,
    number: '',
    title: `Inscription ${id}`,
    mediaUrl: `https://picsum.photos/seed/${encodeURIComponent(id)}/1024/1024`
  }

  const html = renderInscription({ config: CONFIG, inscription, buyAction, buyError: 'Buying is not implemented yet' })
  return htmlResponse(c, html, 501)
}
