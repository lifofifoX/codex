import { readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { parse } from 'yaml'

const root = process.cwd()

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Command failed (${code}): ${cmd}`))
    })
  })
}

async function main() {
  const storeYaml = await readFile(path.join(root, 'config', 'store.yml'), 'utf8')
  const config = parse(storeYaml)
  const theme = config.theme
  const input = path.join(root, 'app', 'assets', 'stylesheets', `application.${theme}.tailwind.css`)

  const output = path.join(root, 'public', 'application.css')

  const binName = process.platform === 'win32' ? 'tailwindcss.cmd' : 'tailwindcss'
  const bin = path.join(root, 'node_modules', '.bin', binName)

  await run(bin, ['-i', input, '-o', output, '--minify'])
}

main().catch((e) => {
  process.stderr.write(String(e?.stack ?? e) + '\n')
  process.exit(1)
})

