import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  setConnected() {
    this.element.classList.add('connected')
  }

  setDisconnected() {
    this.element.classList.remove('connected')
  }
}
