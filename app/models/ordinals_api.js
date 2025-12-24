import { CONFIG } from '../config.js'
import { fetchJSON } from '../utils/fetch_json.js'

function chunk(arr, size) {
  const chunks = []
  for (let index = 0; index < arr.length; index += size) chunks.push(arr.slice(index, index + size))
  return chunks
}

class OrdinalsAPIClient {
  constructor({ baseUrl }) {
    this.baseUrl = String(baseUrl).endsWith('/') ? String(baseUrl).slice(0, -1) : String(baseUrl)
  }

  async findInscriptionsByAddress(address) {
    const data = await fetchJSON(`${this.baseUrl}/address/${address}`)
    return data.inscriptions ?? []
  }

  async loadInscriptionsMetadata(inscriptionIds, batchSize = 200) {
    const batches = chunk(inscriptionIds, batchSize)
    const metadataList = []

    for (const batch of batches) {
      const data = await fetchJSON(`${this.baseUrl}/inscriptions`, {
        method: 'POST',
        body: JSON.stringify(batch)
      })

      metadataList.push(...(Array.isArray(data) ? data : []))
    }

    return metadataList
  }
}

export const OrdinalsAPI = new OrdinalsAPIClient({ baseUrl: CONFIG.ord_api_url })
