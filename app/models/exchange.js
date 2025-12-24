import { CONFIG } from '../config.js'

export default class Exchange {
  #cachedRates = {}

  async fetch() {
    try {
      const response = await fetch(`${CONFIG.mempool_space_api_url}/v1/prices`)
      const json = await response.json()

      this.#cachedRates = json
    } catch(error) {
      console.log('Error fetching data:', error)
    }
  }

  rateFor(currency) {
    return this.#cachedRates[currency]
  }
}
