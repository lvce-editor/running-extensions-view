import { expect, test } from '@jest/globals'
import { get, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import { initializeMainProcess } from '../src/parts/InitializeMainProcess/InitializeMainProcess.ts'

test('initializes a lazy main process connection through the renderer worker', async () => {
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToMainProcess.sendMessagePortToMainProcess'() {},
  })

  await initializeMainProcess()
  expect(mockRendererRpc.invocations).toEqual([])

  const rpc = get(RpcId.MainProcess)
  rpc.send('test')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(mockRendererRpc.invocations).toEqual([
    [
      'SendMessagePortToMainProcess.sendMessagePortToMainProcess',
      expect.anything(),
      'HandleElectronMessagePort.handleElectronMessagePort',
      0,
    ],
  ])
  await rpc.dispose()
})
