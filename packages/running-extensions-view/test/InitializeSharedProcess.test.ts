import { expect, test } from '@jest/globals'
import { get, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import { initializeSharedProcess } from '../src/parts/InitializeSharedProcess/InitializeSharedProcess.ts'

test('initializes a lazy direct connection to the shared process', async () => {
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess'() {},
  })

  await initializeSharedProcess()
  expect(mockRendererRpc.invocations).toEqual([])

  const rpc = get(RpcId.SharedProcess)
  rpc.send('test')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(mockRendererRpc.invocations).toEqual([
    [
      'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess',
      expect.anything(),
      'HandleElectronMessagePort.handleElectronMessagePort',
      0,
    ],
  ])
  await rpc.dispose()
})
