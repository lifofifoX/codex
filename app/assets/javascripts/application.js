import '@hotwired/turbo'
import { Application } from '@hotwired/stimulus'
import CheckoutController from './controllers/checkout_controller.js'
import ImageController from './controllers/image_controller.js'

const application = Application.start()
application.register('checkout', CheckoutController)
application.register('image', ImageController)
