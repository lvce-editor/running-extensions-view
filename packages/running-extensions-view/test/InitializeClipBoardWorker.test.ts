import { expect, test } from '@jest/globals'
import { get, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import { initializeClipBoardWorker } from '../src/parts/InitializeClipBoardWorker/InitializeClipBoardWorker.ts'

test('initializes a lazy direct connection to the clipboard worker', async () => {
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToClipBoardWorker'() {},
  })

  await initializeClipBoardWorker()
  expect(mockRendererRpc.invocations).toEqual([])

  const rpc = get(RpcId.ClipBoardWorker)
  rpc.send('test')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(mockRendererRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToClipBoardWorker', expect.anything(), 'ClipBoard.handleMessagePort', 0],
  ])
  await rpc.dispose()
})
