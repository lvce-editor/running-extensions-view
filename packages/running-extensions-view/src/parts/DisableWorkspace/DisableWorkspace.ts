import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const disableWorkspace = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions } = state
  const extension = extensions[index]
  if (extension) {
    await ExtensionManagementWorker.invoke('Extensions.disableWorkspace', extension.id)
  }
  return state
}
