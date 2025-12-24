function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchJSON(url, options = {}, retries = 2) {
  let attempt = 0
  let lastError

  const method = String(options.method ?? 'GET').toUpperCase()
  const hasBody = typeof options.body !== 'undefined'

  const headers = {
    Accept: 'application/json',
    ...(options.headers ?? {})
  }

  if ((hasBody || method !== 'GET') && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  while (attempt <= retries) {
    try {
      const response = await fetch(url, { ...options, headers })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`${response.status} ${response.statusText} ${text}`)
      }

      return await response.json()
    } catch (error) {
      lastError = error
      if (attempt === retries) break

      await sleep(250 * Math.pow(2, attempt))
      attempt++
    }
  }

  throw lastError
}


