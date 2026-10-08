import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', '..', '..')

const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'node_modules')
const workerPath = join(root, '.tmp', 'dist', 'dist', 'runningExtensionsViewMain.js')
const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')
const isCommitHash = (dirent) => dirent.length === 7 && /^[a-z\d]+$/.test(dirent)
const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')
const content = await readFile(rendererWorkerMainPath, 'utf8')

const remoteUrl = getRemoteUrl(workerPath)
if (!content.includes('// const runningExtensionsViewWorkerUrl = ') && !content.includes(remoteUrl)) {
  const oldOccurrence = `const runningExtensionsViewWorkerUrl = \`\${assetDir}/packages/running-extensions-view/dist/runningExtensionsViewMain.js\``
  const currentOccurrence = `\`\${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/running-extensions-view/dist/runningExtensionsViewMain.js\``
  const occurrence = content.includes(oldOccurrence) ? oldOccurrence : currentOccurrence
  const replacement = content.includes(oldOccurrence)
    ? `// const runningExtensionsViewWorkerUrl = \`\${assetDir}/packages/running-extensions-view/dist/runningExtensionsViewMain.js\`
const runningExtensionsViewWorkerUrl = \`${remoteUrl}\``
    : `\`${remoteUrl}\``
  if (!content.includes(occurrence)) {
    throw new Error('running extensions view worker URL occurrence not found')
  }
  const newContent = content.replace(occurrence, replacement)
  await writeFile(rendererWorkerMainPath, newContent)
}
