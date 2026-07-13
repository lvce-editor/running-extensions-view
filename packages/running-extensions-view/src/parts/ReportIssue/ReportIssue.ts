import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const reportIssue = async (state: RunningExtensionsState): Promise<RunningExtensionsState> => {
  await RendererWorker.confirm('Reporting issues for running extensions is not available yet.')
  return state
}
