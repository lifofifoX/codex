import { Controller } from '@hotwired/stimulus'
import Exchange from '../../../models/exchange.js'

const USD_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default class extends Controller {
  #exchange = new Exchange()
  #observer
  #scheduled = false
  #onTurbo = () => this.#scheduleRefresh()

  connect() {
    this.#observer = new MutationObserver(this.#scheduleRefresh.bind(this))
    this.#observer.observe(this.element, { subtree: true, attributes: true, attributeFilter: ['data-usd-sats'] })

    window.addEventListener('turbo:load', this.#onTurbo)
    window.addEventListener('turbo:render', this.#onTurbo)

    this.#exchange.fetch().then(() => this.#refresh())
  }

  disconnect() {
    if (this.#observer) this.#observer.disconnect()

    window.removeEventListener('turbo:load', this.#onTurbo)
    window.removeEventListener('turbo:render', this.#onTurbo)
  }

  #scheduleRefresh() {
    if (this.#scheduled) return
    this.#scheduled = true

    queueMicrotask(() => {
      this.#scheduled = false
      this.#refresh()
    })
  }

  #refresh() {
    if (!this.#usdRate) return

    const nodes = this.element.querySelectorAll('[data-usd-sats]')

    for (const node of nodes) {
      node.textContent = this.#formatSats(node.getAttribute('data-usd-sats'))
      node.classList.remove('hidden')
    }
  }

  #formatSats(sats) {
    if (!sats) return "-"
    return USD_FORMATTER.format((Number(sats) / 100_000_000) * this.#usdRate)
  }

  get #usdRate() {
    return this.#exchange.rateFor('USD')
  }
}
