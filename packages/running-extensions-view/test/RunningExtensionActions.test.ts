import { expect, test } from '@jest/globals'
import { ClipBoardWorker, ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { copyId } from '../src/parts/CopyId/CopyId.ts'
import { disable } from '../src/parts/Disable/Disable.ts'
import { disableWorkspace } from '../src/parts/DisableWorkspace/DisableWorkspace.ts'
import { reportIssue } from '../src/parts/ReportIssue/ReportIssue.ts'
import { startProfile } from '../src/parts/StartProfile/StartProfile.ts'

const state = {
  extensions: [{ id: 'sample.extension' }],
  platform: 2,
} as any

test('copyId writes the selected extension id', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({
    'ClipBoard.writeText'() {},
  })
  await expect(copyId(state, 0)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'sample.extension']])
})

test('copyId ignores an invalid index', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({
    'ClipBoard.writeText'() {},
  })
  await expect(copyId(state, 4)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('disable disables the selected extension', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disable2'() {},
  })
  await expect(disable(state, 0)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['Extensions.disable2', 'sample.extension', 2]])
})

test('disable ignores an invalid index', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disable2'() {},
  })
  await expect(disable(state, 4)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('disableWorkspace disables the selected extension in the workspace', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disableWorkspace'() {},
  })
  await expect(disableWorkspace(state, 0)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['Extensions.disableWorkspace', 'sample.extension']])
})

test('disableWorkspace ignores an invalid index', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disableWorkspace'() {},
  })
  await expect(disableWorkspace(state, 4)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('reportIssue explains that issue reporting is unavailable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {},
  })
  await expect(reportIssue(state)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Reporting issues for running extensions is not available yet.', undefined]])
})

test('startProfile explains that extension host profiling is unavailable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {},
  })
  await expect(startProfile(state)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Extension host profiling is not available yet.', undefined]])
})
