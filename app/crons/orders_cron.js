import { listPendingOrders, setOrderStatus } from '../models/db/orders.js'
import { Mempool } from '../models/mempool.js'

async function processPendingOrder({ db, order }) {
  try {
    let tx = null
    try { tx = await Mempool.tx(order.txid) } catch { /* Electrs fucked off? */ }

    if (tx) {
      if (tx.status?.confirmed) {
        await setOrderStatus({ db, id: order.id, status: 'confirmed' })
      }

      // TX exists. Nothing more to do.
      return
    }

    // TX disappeared. Lets try to broadcast again.
    const broadcastResult = await Mempool.broadcastTx(order.signed_tx)
    if (broadcastResult === true) return

    const errorText = String(broadcastResult ?? '')
    const match = errorText.match(/^HTTP\s+(\d{3})\b/)
    const status = match ? Number(match[1]) : null

    // Broadcast failed. Lets mark the order as failed.
    if (status === 400) {
      await setOrderStatus({ db, id: order.id, status: 'failed' })
    }

  } catch (err) {
    console.error('processPendingOrder failed', order.id, err)
  }
}

export async function ordersCron({ env }) {
  const db = env.DB

  const startedAt = Date.now()
  const batchSize = 200
  const maxOrdersPerRun = 5000
  const maxRunMs = 25_000
  const concurrency = 8

  let afterId = null
  let processed = 0

  while (true) {
    if (Date.now() - startedAt > maxRunMs) break
    if (processed >= maxOrdersPerRun) break

    const remaining = maxOrdersPerRun - processed
    const limit = Math.min(batchSize, remaining)
    const orders = await listPendingOrders({ db, limit, afterId })
    if (orders.length === 0) break

    for (let i = 0; i < orders.length; i += concurrency) {
      const promises = []

      for (let j = i; j < Math.min(i + concurrency, orders.length); j++) {
        promises.push(processPendingOrder({ db, order: orders[j] }))
      }

      await Promise.all(promises)

      processed += promises.length
      if (Date.now() - startedAt > maxRunMs) break
    }

    afterId = orders[orders.length - 1].id
  }
}

export function runOrdersCron(event, env, ctx) {
  ctx.waitUntil(ordersCron({ env }))
}
