import { Hono } from 'hono'
import { storefrontController } from './storefront_controller.js'
import { showInscriptionController, buyInscriptionController } from './inscription_controller.js'

const app = new Hono()

app.get('/', storefrontController)
app.get('/inscriptions', storefrontController)
app.get('/inscriptions/:id', showInscriptionController)
app.post('/inscriptions/:id/buy', buyInscriptionController)

export default app
