import { ClipBoardWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const copyId = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions } = state
  const extension = extensions[index]
  if (extension) {
    await ClipBoardWorker.writeText(extension.id)
  }
  return state
}
