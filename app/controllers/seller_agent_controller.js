import { Collection } from '../models/collection.js'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function executeSellController(c) {
  const slug = c.req.param('slug')
  const collection = Collection.lookup(slug)

  const body = await c.req.json().catch(() => ({}))

  const signedPsbt = body.signedPsbt
  if (!signedPsbt) return json({ error: 'Missing signedPsbt' }, 400)

  const inscription = await collection.loadInscription({ db: c.env.DB, inscriptionId: body.inscriptionId })
  if (!inscription) return json({ error: 'Inscription is not available' }, 404)

  const durableObject = c.env.SELLER_AGENT.get(c.env.SELLER_AGENT.idFromName(`${slug}:${inscription.id}`))

  const response = await durableObject.fetch('https://seller-agent/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      collectionSlug: slug,
      inscriptionId: inscription.id,
      signedPsbt
    })
  })

  const data = await response.json().catch(() => ({}))

  return json(data, response.status)
}


