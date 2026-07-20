import { expect, test } from '@jest/globals'
import { ClipBoardWorker, ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { copyId } from '../src/parts/CopyId/CopyId.ts'
import { disable } from '../src/parts/Disable/Disable.ts'
import { disableWorkspace } from '../src/parts/DisableWorkspace/DisableWorkspace.ts'
import { reportIssue } from '../src/parts/ReportIssue/ReportIssue.ts'
import { startProfile } from '../src/parts/StartProfile/StartProfile.ts'
import { takeHeapSnapshot } from '../src/parts/TakeHeapSnapshot/TakeHeapSnapshot.ts'

const state = {
  extensions: [{ id: 'sample.extension', isolated: true }],
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

test.skip('reportIssue explains that issue reporting is unsupported without a repository', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {},
  })
  await expect(reportIssue(state, 0)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Reporting issues is not supported for this extension.', undefined]])
})

test('reportIssue explains that issue reporting is unsupported for an invalid repository', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {},
  })
  const stateWithInvalidRepository = {
    ...state,
    extensions: [{ id: 'sample.extension', repository: 'not-a-url' }],
  }
  await expect(reportIssue(stateWithInvalidRepository, 0)).resolves.toBe(stateWithInvalidRepository)
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Reporting issues is not supported for this extension.', undefined]])
})

test('reportIssue opens GitHub issues externally on Electron', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.openExternal'() {},
  })
  const stateWithRepository = {
    ...state,
    extensions: [{ id: 'sample.extension', repository: 'https://github.com/example/sample-extension' }],
  }
  await expect(reportIssue(stateWithRepository, 0)).resolves.toBe(stateWithRepository)
  expect(mockRpc.invocations).toEqual([['Open.openExternal', 'https://github.com/example/sample-extension/issues']])
})

test('reportIssue opens GitHub issues in a new browser tab', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl'() {},
  })
  const stateWithRepository = {
    ...state,
    extensions: [{ id: 'sample.extension', repository: 'https://github.com/example/sample-extension' }],
    platform: 1,
  }
  await expect(reportIssue(stateWithRepository, 0)).resolves.toBe(stateWithRepository)
  expect(mockRpc.invocations).toEqual([['Open.openUrl', 'https://github.com/example/sample-extension/issues']])
})

test('startProfile explains that extension host profiling is unavailable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {},
  })
  await expect(startProfile(state)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Extension host profiling is not available yet.', undefined]])
})

test('takeHeapSnapshot takes a snapshot of the selected isolated extension worker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.takeWorkerHeapSnapshot'() {
      return {
        ok: true,
        uri: '/home/test/Downloads/sample.heapsnapshot',
      }
    },
    'GetWindowId.getWindowId'() {
      return 7
    },
    'Main.openUri'() {},
  })

  await expect(takeHeapSnapshot(state, 0)).resolves.toBe(state)

  expect(mockRpc.invocations).toEqual([
    ['GetWindowId.getWindowId'],
    ['Developer.takeWorkerHeapSnapshot', 7, 'Extension API (Electron): sample.extension'],
    ['Main.openUri', '/home/test/Downloads/sample.heapsnapshot'],
  ])
})

test('takeHeapSnapshot ignores an invalid index', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  await expect(takeHeapSnapshot(state, 4)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('takeHeapSnapshot uses a custom worker name', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.takeWorkerHeapSnapshot'() {
      return {
        ok: true,
        uri: '/home/test/Downloads/sample.heapsnapshot',
      }
    },
    'GetWindowId.getWindowId'() {
      return 7
    },
    'Main.openUri'() {},
  })
  const stateWithCustomWorkerName = {
    ...state,
    extensions: [{ id: 'sample.extension', isolated: true, workerName: 'Sample Extension Worker' }],
  }

  await takeHeapSnapshot(stateWithCustomWorkerName, 0)

  expect(mockRpc.invocations).toEqual([
    ['GetWindowId.getWindowId'],
    ['Developer.takeWorkerHeapSnapshot', 7, 'Sample Extension Worker'],
    ['Main.openUri', '/home/test/Downloads/sample.heapsnapshot'],
  ])
})

test('takeHeapSnapshot shows an error when the worker is not found', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {},
    'Developer.takeWorkerHeapSnapshot'() {
      return {
        error: 'Worker not found: Sample Extension Worker',
        ok: false,
      }
    },
    'GetWindowId.getWindowId'() {
      return 7
    },
  })

  await takeHeapSnapshot(state, 0)

  expect(mockRpc.invocations).toEqual([
    ['GetWindowId.getWindowId'],
    ['Developer.takeWorkerHeapSnapshot', 7, 'Extension API (Electron): sample.extension'],
    ['ConfirmPrompt.prompt', 'Worker not found: Sample Extension Worker', undefined],
  ])
})

test('takeHeapSnapshot is unavailable outside electron', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const browserState = {
    ...state,
    platform: 1,
  }

  await takeHeapSnapshot(browserState, 0)

  expect(mockRpc.invocations).toEqual([])
})

test('takeHeapSnapshot is unavailable for shared extension hosts', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const sharedExtensionHostState = {
    ...state,
    extensions: [{ id: 'sample.extension', isolated: false }],
  }

  await takeHeapSnapshot(sharedExtensionHostState, 0)

  expect(mockRpc.invocations).toEqual([])
})
