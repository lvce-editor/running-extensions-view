import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../src/parts/RunningExtensionsState/RunningExtensionsState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loads running extensions in alphabetical order', async () => {
  const extensions = [
    { activationEvent: '', activationTime: 1, icon: '', id: 'test.zebra', name: 'Zebra' },
    { activationEvent: '', activationTime: 1, icon: '', id: 'test.alpha', name: 'Alpha' },
  ]
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getRunningExtensions': () => extensions,
  })
  const state = {
    assetDir: '/test/assets',
    extensions: [],
    loaded: false,
    platform: 1,
  } as unknown as RunningExtensionsState

  await expect(loadContent(state)).resolves.toEqual({
    ...state,
    extensions: [extensions[1], extensions[0]],
    loaded: true,
  })
  expect(mockRpc.invocations).toEqual([['Extensions.getRunningExtensions', '/test/assets', 1]])
})
