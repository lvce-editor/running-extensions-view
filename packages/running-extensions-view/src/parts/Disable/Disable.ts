import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const disable = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions, platform } = state
  const extension = extensions[index]
  if (extension) {
    await ExtensionManagementWorker.disable2(extension.id, platform)
  }
  return state
}
