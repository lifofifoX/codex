export function htmlResponse(c, html, status = 200) {
  return c.html(html, status, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store'
  })
}
