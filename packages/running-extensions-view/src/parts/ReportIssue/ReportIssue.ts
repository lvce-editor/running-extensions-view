import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import { getIssuesUrl } from '../GetIssuesUrl/GetIssuesUrl.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

export const reportIssue = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions, platform } = state
  const extension = extensions[index]
  if (!extension || !extension.repository) {
    return state
  }
  const issuesUrl = getIssuesUrl(extension.repository)
  if (!issuesUrl) {
    await RendererWorker.confirm(RunningExtensionsStrings.reportingIssuesNotSupported())
    return state
  }
  if (platform === PlatformType.Electron) {
    await RendererWorker.openExternal(issuesUrl)
  } else {
    await RendererWorker.openUrl(issuesUrl)
  }
  return state
}
