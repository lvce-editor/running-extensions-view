import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')
const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()
const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/running-extensions-view'
const { commitHash } = await sharedProcess.exportStatic({
  extensionPath: '',
  root,
  testPath: 'packages/e2e',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp', 'dist', 'dist', 'runningExtensionsViewMain.js')
const remoteUrl = getRemoteUrl(workerPath)
const occurrence = `// const runningExtensionsViewWorkerUrl = \`\${assetDir}/packages/running-extensions-view/dist/runningExtensionsViewMain.js\`
const runningExtensionsViewWorkerUrl = \`${remoteUrl}\``
const replacement = `const runningExtensionsViewWorkerUrl = \`\${assetDir}/packages/running-extensions-view/dist/runningExtensionsViewMain.js\``

if (!content.includes(occurrence)) {
  throw new Error('occurrence not found')
}

await writeFile(rendererWorkerPath, content.replace(occurrence, replacement))
await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
