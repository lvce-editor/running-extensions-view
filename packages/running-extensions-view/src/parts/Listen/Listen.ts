import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeClipBoardWorker } from '../InitializeClipBoardWorker/InitializeClipBoardWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeMainProcess } from '../InitializeMainProcess/InitializeMainProcess.ts'
import { initializeSharedProcess } from '../InitializeSharedProcess/InitializeSharedProcess.ts'
import { registerCommands } from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
  await Promise.all([initializeClipBoardWorker(), initializeExtensionManagementWorker(), initializeMainProcess(), initializeSharedProcess()])
}
