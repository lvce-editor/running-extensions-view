import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const reportIssue = async (state: RunningExtensionsState): Promise<RunningExtensionsState> => {
  await RendererWorker.confirm(RunningExtensionsStrings.reportingIssuesForRunningExtensionsNotAvailable())
  return state
}
