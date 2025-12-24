import { readdir, unlink } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()

async function safeUnlink(p) {
  try {
    await unlink(p)
  } catch (e) {
    if (e && (e.code === 'ENOENT' || e.code === 'EISDIR')) return
    throw e
  }
}

async function main() {
  const publicDir = path.join(root, 'public')
  const entries = await readdir(publicDir, { withFileTypes: true })

  for (const ent of entries) {
    if (!ent.isFile()) continue
    const name = ent.name
    const isHashedAppAsset =
      (name.startsWith('application-') && (name.endsWith('.js') || name.endsWith('.js.map') || name.endsWith('.css') || name.endsWith('.css.map'))) ||
      name === 'application.css'

    if (isHashedAppAsset) await safeUnlink(path.join(publicDir, name))
  }

  await safeUnlink(path.join(root, 'scripts', 'meta.json'))
}

main().catch((e) => {
  process.stderr.write(String(e?.stack ?? e) + '\n')
  process.exit(1)
})


