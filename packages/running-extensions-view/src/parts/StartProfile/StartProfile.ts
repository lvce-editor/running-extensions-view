import { PlatformType } from '@lvce-editor/constants'
import { DialogWorker, MainProcess, RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

export const startProfile = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions, platform } = state
  const extension = extensions[index]
  if (!extension) {
    return state
  }
  if (platform !== PlatformType.Electron) {
    await DialogWorker.invoke('ConfirmPrompt.prompt', RunningExtensionsStrings.extensionHostProfilingNotAvailable(), undefined)
    return state
  }
  const windowId = await RendererWorker.getWindowId()
  try {
    const uri = extension.isolated
      ? await MainProcess.invoke(
          'ElectronDeveloper.takeWorkerCpuProfile',
          windowId,
          extension.workerName || RunningExtensionsStrings.extensionApiElectron(extension.id),
        )
      : await MainProcess.invoke('ElectronDeveloper.takeWindowCpuProfile', windowId)
    await RendererWorker.invoke('Main.openUri', uri)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await DialogWorker.invoke('ConfirmPrompt.prompt', message, undefined)
  }
  return state
}
