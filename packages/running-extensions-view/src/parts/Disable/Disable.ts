import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const disable = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const extension = state.extensions[index]
  if (extension) {
    await ExtensionManagementWorker.invoke('Extensions.disable2', extension.id, state.platform)
  }
  return state
}
