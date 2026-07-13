import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const startProfile = async (state: RunningExtensionsState): Promise<RunningExtensionsState> => {
  await RendererWorker.confirm('Extension host profiling is not available yet.')
  return state
}
