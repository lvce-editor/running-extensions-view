import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionManagementWorker(port, 0)
}

export const initializeExtensionManagementWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  ExtensionManagementWorker.set(rpc)
}
