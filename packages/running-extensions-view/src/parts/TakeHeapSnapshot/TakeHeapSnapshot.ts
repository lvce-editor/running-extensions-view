import { PlatformType } from '@lvce-editor/constants'
import { MainProcess, RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

export const takeHeapSnapshot = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions, platform } = state
  const extension = extensions[index]
  if (!extension || platform !== PlatformType.Electron || !extension.isolated) {
    return state
  }
  const windowId = await RendererWorker.getWindowId()
  const workerName = extension.workerName || RunningExtensionsStrings.extensionApiElectron(extension.id)
  try {
    const uri = await MainProcess.invoke('ElectronDeveloper.takeWorkerHeapSnapshot', windowId, workerName)
    await RendererWorker.invoke('Main.openUri', uri)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await RendererWorker.confirm(message)
    return state
  }
  return state
}
