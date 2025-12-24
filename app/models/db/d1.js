function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isTransientD1Error(error) {
  const message = error?.message ? String(error.message) : String(error)
  if (message.includes('D1_ERROR: Failed to parse body as JSON')) return true
  if (message.includes('500 Internal Server Error')) return true

  return false
}

export async function withD1Retry(fn, { retries = 3, baseDelayMs = 75 } = {}) {
  let attempt = 0

  while (true) {
    try {
      return await fn()
    } catch (error) {
      attempt += 1
      if (attempt > retries || !isTransientD1Error(error)) throw error
      await sleep(baseDelayMs * attempt)
    }
  }
}
