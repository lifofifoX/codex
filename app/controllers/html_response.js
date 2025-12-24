export function htmlResponse(c, html, { status = 200, cacheControl = 'no-store' } = {}) {
  return c.html(html, status, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': cacheControl
  })
}
