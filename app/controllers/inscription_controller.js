import { Collection } from '../models/collection.js'
import { OrdinalsAPI } from '../models/ordinals_api.js'
import { Inscription } from '../models/inscription.js'
import { renderInscription } from '../helpers/inscription.js'
import { htmlResponse } from './html_response.js'
import { getActiveOrderForInscription } from '../models/db/orders.js'
import { getInscriptionMetadata } from '../models/db/inscriptions.js'

export async function showCollectionInscriptionController(c) {
  const slug = c.req.param('collection')
  const id = c.req.param('id')
  const db = c.env.DB

  let collection
  try {
    collection = Collection.lookup(slug)
  } catch {
    return c.text('Not Found', 404)
  }

  const rawOrder = await getActiveOrderForInscription({ db, inscriptionId: id })
  const order = rawOrder ?? { status: '', txid: '' }
  let inscription = await collection.loadInscription({ db, inscriptionId: id })

  if (!inscription && rawOrder) {
    const cached = await getInscriptionMetadata({ db, inscriptionId: id })
    const metadata = cached ?? (await OrdinalsAPI.loadInscriptionsMetadata([id]))[0]
    if (metadata) inscription = new Inscription({ metadata })
  }
  if (!inscription) return c.text('Not Found', 404)

  const parentInscription = await collection.parentInscription({ db })
  const html = renderInscription({ config: collection.policy, inscription, parentInscription, order })
  return htmlResponse(c, html, { cacheControl: 'public, max-age=0, s-maxage=5' })
}
