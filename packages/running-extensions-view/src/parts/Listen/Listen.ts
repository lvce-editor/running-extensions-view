import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeClipBoardWorker } from '../InitializeClipBoardWorker/InitializeClipBoardWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeMainProcess } from '../InitializeMainProcess/InitializeMainProcess.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { initializeSharedProcess } from '../InitializeSharedProcess/InitializeSharedProcess.ts'
import { registerCommands } from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([
    initializeRendererWorker(),
    initializeClipBoardWorker(),
    initializeExtensionManagementWorker(),
    initializeMainProcess(),
    initializeSharedProcess(),
  ])
}
