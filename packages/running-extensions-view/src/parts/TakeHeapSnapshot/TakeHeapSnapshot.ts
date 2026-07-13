import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const takeHeapSnapshot = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions } = state
  const extension = extensions[index]
  if (!extension) {
    return state
  }
  const windowId = await RendererWorker.getWindowId()
  const workerName = extension.workerName || `Extension API (Electron): ${extension.id}`
  await RendererWorker.invoke('Developer.takeWorkerHeapSnapshot', windowId, workerName)
  return state
}
