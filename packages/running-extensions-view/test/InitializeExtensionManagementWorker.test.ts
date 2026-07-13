import { expect, test } from '@jest/globals'
import { get, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import { initializeExtensionManagementWorker } from '../src/parts/InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'

test('initializes a lazy direct connection to the extension management worker', async () => {
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {},
  })

  await initializeExtensionManagementWorker()
  expect(mockRendererRpc.invocations).toEqual([])

  const rpc = get(RpcId.ExtensionManagementWorker)
  rpc.send('test')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(mockRendererRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker', expect.anything(), 'Extensions.handleMessagePort', 0],
  ])
  await rpc.dispose()
})
