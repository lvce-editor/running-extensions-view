import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getRunningExtensions } from '../src/parts/ExtensionManagement/ExtensionManagement.ts'

test('gets running extensions from the extension management worker', async () => {
  const extensions = [{ id: 'test.extension', status: 'running' }]
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getRunningExtensions': () => extensions,
  })

  await expect(getRunningExtensions('/test/assets', 1)).resolves.toBe(extensions)
  expect(mockRpc.invocations).toEqual([['Extensions.getRunningExtensions', '/test/assets', 1]])
})
