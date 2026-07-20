import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { MainProcess, RpcId, SharedProcess } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await SharedProcess.invokeAndTransfer('TemporaryMessagePort.sendToElectron', port, RpcId.MainProcess, 0)
}

export const initializeMainProcess = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  MainProcess.set(rpc)
}
