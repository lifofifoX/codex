import { readFile, mkdir, writeFile, copyFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'

const root = process.cwd()

async function main() {
  const metaPath = path.join(root, 'scripts', 'meta.json')
  const meta = JSON.parse(await readFile(metaPath, 'utf8'))

  let js = ''
  for (const [outFile, info] of Object.entries(meta.outputs ?? {})) {
    if (info.entryPoint === 'app/assets/javascripts/application.js') {
      const normalized = outFile.replaceAll('\\', '/')
      js = normalized.startsWith('public/') ? '/' + normalized.slice('public/'.length) : '/' + normalized
      break
    }
  }

  if (!js) throw new Error('Could not find entry output for app/assets/javascripts/application.js in meta.json')

  const cssIn = path.join(root, 'public', 'application.css')
  const cssBuf = await readFile(cssIn)
  const cssHash = createHash('sha256').update(cssBuf).digest('hex').slice(0, 10)
  const cssOutName = `application-${cssHash}.css`
  const cssOut = path.join(root, 'public', cssOutName)
  await copyFile(cssIn, cssOut)
  await unlink(cssIn)

  const assets = {
    js,
    css: `/${cssOutName}`
  }

  const outDir = path.join(root, 'generated')
  await mkdir(outDir, { recursive: true })
  const outFile = path.join(outDir, 'assets.js')
  await writeFile(outFile, `export const assets = ${JSON.stringify(assets, null, 2)}\n`, 'utf8')

  await unlink(metaPath)
}

main().catch((e) => {
  process.stderr.write(String(e?.stack ?? e) + '\n')
  process.exit(1)
})
