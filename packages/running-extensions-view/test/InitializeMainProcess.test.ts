import { expect, test } from '@jest/globals'
import { get, RpcId, SharedProcess } from '@lvce-editor/rpc-registry'
import { initializeMainProcess } from '../src/parts/InitializeMainProcess/InitializeMainProcess.ts'

test('initializes a lazy direct connection to the main process', async () => {
  using mockSharedProcessRpc = SharedProcess.registerMockRpc({
    'TemporaryMessagePort.sendToElectron'() {},
  })

  await initializeMainProcess()
  expect(mockSharedProcessRpc.invocations).toEqual([])

  const rpc = get(RpcId.MainProcess)
  rpc.send('test')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(mockSharedProcessRpc.invocations).toEqual([['TemporaryMessagePort.sendToElectron', expect.anything(), RpcId.MainProcess, 0]])
  await rpc.dispose()
})
