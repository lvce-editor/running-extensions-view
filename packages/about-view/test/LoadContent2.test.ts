import { expect, test, beforeAll } from '@jest/globals'
import { FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { AboutState } from '../src/parts/AboutState/AboutState.ts'
import * as AboutFocusId from '../src/parts/AboutFocusId/AboutFocusId.ts'
import * as AboutStates from '../src/parts/AboutStates/AboutStates.ts'
import * as LoadContent2 from '../src/parts/LoadContent2/LoadContent2.ts'

beforeAll(() => {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      userAgent: 'Test',
    },
  })
})

const registerConfigJsonPathMock = (): ReturnType<typeof RendererWorker.registerMockRpc> => {
  return RendererWorker.registerMockRpc({
    'PlatformPaths.getConfigJsonPath'(): string {
      return 'config.json'
    },
  })
}

test('loadContent2', async () => {
  RendererWorker.registerMockRpc({})
  AboutStates.clear()

  const uid = 1
  const oldState: AboutState = {
    focusId: AboutFocusId.Ok,
    lines: ['old line'],
    productName: 'Old Name',
    uid: 1,
    useNewLoadConfig: false,
  }
  AboutStates.set(uid, oldState, oldState)

  const newState = await LoadContent2.loadContent2(oldState)

  expect(newState).toEqual({
    focusId: AboutFocusId.Ok,
    lines: ['Version: 0.0.0-dev', 'Commit: unknown commit', 'Date: unknown', 'Browser: Test'],
    productName: 'Old Name',
    uid: 1,
    useNewLoadConfig: false,
  })
})

test('loadContent2 - useNewLoadConfig', async () => {
  using mockRendererRpc = registerConfigJsonPathMock()
  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile'(uri: string): string {
      expect(uri).toBe('config.json')
      return JSON.stringify({
        commit: 'abc123',
        date: 'config-date',
        productName: 'Configured Editor',
        version: '1.2.3',
      })
    },
  })
  AboutStates.clear()

  const uid = 1
  const oldState: AboutState = {
    focusId: AboutFocusId.Ok,
    lines: ['old line'],
    productName: 'Old Name',
    uid: 1,
    useNewLoadConfig: true,
  }
  AboutStates.set(uid, oldState, oldState)

  const newState = await LoadContent2.loadContent2(oldState)

  expect(newState).toEqual({
    focusId: AboutFocusId.Ok,
    lines: ['Version: 1.2.3', 'Commit: abc123', 'Date: Invalid Date: config-date', 'Browser: Test'],
    productName: 'Configured Editor',
    uid: 1,
    useNewLoadConfig: true,
  })
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getConfigJsonPath']])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile', 'config.json']])
})

test('loadContent2 - useNewLoadConfig falls back to current values', async () => {
  using mockRendererRpc = registerConfigJsonPathMock()
  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile'(): string {
      return JSON.stringify({})
    },
  })
  AboutStates.clear()

  const uid = 1
  const oldState: AboutState = {
    focusId: AboutFocusId.Ok,
    lines: ['old line'],
    productName: 'Old Name',
    uid: 1,
    useNewLoadConfig: true,
  }
  AboutStates.set(uid, oldState, oldState)

  const newState = await LoadContent2.loadContent2(oldState)

  expect(newState).toEqual({
    focusId: AboutFocusId.Ok,
    lines: ['Version: 0.0.0-dev', 'Commit: unknown commit', 'Date: unknown', 'Browser: Test'],
    productName: 'Old Name',
    uid: 1,
    useNewLoadConfig: true,
  })
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getConfigJsonPath']])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile', 'config.json']])
})

test('loadContent2 - useNewLoadConfig falls back to current values for invalid config', async () => {
  using mockRendererRpc = registerConfigJsonPathMock()
  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile'(): string {
      return '{'
    },
  })
  AboutStates.clear()

  const uid = 1
  const oldState: AboutState = {
    focusId: AboutFocusId.Ok,
    lines: ['old line'],
    productName: 'Old Name',
    uid: 1,
    useNewLoadConfig: true,
  }
  AboutStates.set(uid, oldState, oldState)

  const newState = await LoadContent2.loadContent2(oldState)

  expect(newState).toEqual({
    focusId: AboutFocusId.Ok,
    lines: ['Version: 0.0.0-dev', 'Commit: unknown commit', 'Date: unknown', 'Browser: Test'],
    productName: 'Old Name',
    uid: 1,
    useNewLoadConfig: true,
  })
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getConfigJsonPath']])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile', 'config.json']])
})
