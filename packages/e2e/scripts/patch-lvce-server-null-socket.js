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
const upgradeBefore = `const sendHandleSharedProcess = async (request, socket, method, ...params) => {
  request.on('error', handleRequestError)
  socket.on('error', handleSocketUpgradeError)`
const upgradeAfter = `const sendHandleSharedProcess = async (request, socket, method, ...params) => {
  request.on('error', handleRequestError)
  if (!socket) {
    return
  }
  socket.on('error', handleSocketUpgradeError)`
const content = await readFile(file, 'utf8')
let updatedContent = content

if (!content.includes(after)) {
  if (!content.includes(before)) {
    throw new Error('Could not patch @lvce-editor/server null socket handler')
  }
  updatedContent = updatedContent.replace(before, after)
}

if (!content.includes(upgradeAfter)) {
  if (!content.includes(upgradeBefore)) {
    throw new Error('Could not patch @lvce-editor/server null upgrade socket handler')
  }
  updatedContent = updatedContent.replace(upgradeBefore, upgradeAfter)
}

if (updatedContent !== content) {
  await writeFile(file, updatedContent)
}
