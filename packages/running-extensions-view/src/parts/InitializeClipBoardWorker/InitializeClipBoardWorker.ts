import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ClipBoardWorker, RendererWorker } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToClipBoardWorker(port, 0)
}

export const initializeClipBoardWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  ClipBoardWorker.set(rpc)
}
