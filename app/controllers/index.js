import { Hono } from 'hono'
import { homeController } from './home_controller.js'
import { policyController } from './policy_controller.js'
import { collectionController } from './collection_controller.js'
import { showCollectionInscriptionController } from './inscription_controller.js'
import { activityController } from './activity_controller.js'
import { executeSellController } from './seller_agent_controller.js'
import { runSyncCollectionsCron } from '../crons/sync_collections_cron.js'
import { runOrdersCron } from '../crons/orders_cron.js'
export { SellerAgent } from '../durable_objects/seller_agent.js'

const app = new Hono()

app.onError((err, c) => {
  console.error(err)
  return c.text(err?.stack ? err.stack : String(err), 500)
})

app.get('/', homeController)
app.get('/policy', policyController)
app.get('/activity', activityController)
app.post('/agent/sell/:slug/execute', executeSellController)
app.get('/:collection', collectionController)
app.get('/:collection/:id', showCollectionInscriptionController)

export default {
  fetch: app.fetch,
  scheduled: (event, env, ctx) => {
    switch (event?.cron) {
      case '*/5 * * * *':
        runOrdersCron(event, env, ctx)
        return
      case '*/10 * * * *':
        runSyncCollectionsCron(event, env, ctx)
        return
      default:
        runOrdersCron(event, env, ctx)
        runSyncCollectionsCron(event, env, ctx)
        return
    }
  }
}
