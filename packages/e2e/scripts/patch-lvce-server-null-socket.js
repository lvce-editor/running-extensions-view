import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const file = join(import.meta.dirname, '..', '..', 'server', 'node_modules', '@lvce-editor', 'server', 'src', 'server.js')
const before = `  if (!hasErrorListener.has(res.socket)) {
    res.socket.on('error', handleSocketError)
    hasErrorListener.add(res.socket)
  }`
const after = `  if (res.socket && !hasErrorListener.has(res.socket)) {
    res.socket.on('error', handleSocketError)
    hasErrorListener.add(res.socket)
  }`
const content = await readFile(file, 'utf8')

if (!content.includes(after)) {
  if (!content.includes(before)) {
    throw new Error('Could not patch @lvce-editor/server null socket handler')
  }
  await writeFile(file, content.replace(before, after))
}
