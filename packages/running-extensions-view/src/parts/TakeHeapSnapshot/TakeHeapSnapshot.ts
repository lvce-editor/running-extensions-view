import { PlatformType } from '@lvce-editor/constants'
import { MainProcess, RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'
import { RunningExtension } from '../RunningExtension/RunningExtension.ts'

interface TakeHeapSnapshotError {
  readonly error: string
  readonly ok: false
}

interface TakeHeapSnapshotSuccess {
  readonly ok: true
  readonly uri: string
}

type TakeHeapSnapshotResult = TakeHeapSnapshotError | TakeHeapSnapshotSuccess

const canTakeHeapSnapshot = (platform: number, extension: RunningExtension): boolean => {
  return !(!extension || platform !== PlatformType.Electron || !extension.isolated)
}

export const takeHeapSnapshot = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions, platform } = state
  const extension = extensions[index]
  if (!canTakeHeapSnapshot(platform, extension)) {
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
