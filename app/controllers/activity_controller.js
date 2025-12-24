import { renderActivity } from '../helpers/activity.js'
import { htmlResponse } from './html_response.js'
import { CONFIG } from '../config.js'
import { listOrders } from '../models/db/orders.js'

export async function activityController(c) {
  const orders = await listOrders({ db: c.env.DB, limit: 50 })
  const html = renderActivity({ config: CONFIG, orders })

  return htmlResponse(c, html)
}
