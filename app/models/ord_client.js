export function createOrdClient({ baseUrl }) {
  async function listInscriptionsByAddress({ address, cursor, limit }) {
    const page = Number.parseInt(cursor ?? '1', 10)
    const items = Array.from({ length: limit }).map((_, i) => {
      const n = (page - 1) * limit + i + 1
      return {
        id: `stub-${address}-${n}`,
        number: n,
        title: `Inscription #${n}`,
        thumbnailUrl: `https://picsum.photos/seed/${encodeURIComponent(`stub-${n}`)}/512/512`
      }
    })

    return {
      items,
      nextCursor: String(page + 1),
      prevCursor: page > 1 ? String(page - 1) : null,
      isStub: true,
      baseUrl
    }
  }

  async function getInscription({ id }) {
    return {
      inscription: {
        id,
        number: '',
        title: `Inscription ${id}`,
        mediaUrl: `https://picsum.photos/seed/${encodeURIComponent(id)}/1024/1024`
      },
      isStub: true,
      baseUrl
    }
  }

  return { listInscriptionsByAddress, getInscription }
}
