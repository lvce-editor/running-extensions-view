import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import { getIssuesUrl } from '../GetIssuesUrl/GetIssuesUrl.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

const OpenCommand = {
  External: 1,
  Url: 2,
}

const getOpenCommand = (platform: number): number => {
  if (platform === PlatformType.Electron) {
    return OpenCommand.External
  } else {
    return OpenCommand.Url
  }
}

const applyOpenCommand = async (cmd: number, issuesUrl: string): Promise<void> => {
  if (cmd === OpenCommand.External) {
    await RendererWorker.openExternal(issuesUrl)
  } else {
    await RendererWorker.openUrl(issuesUrl)
  }
}

export const reportIssue = async (state: RunningExtensionsState, index: number): Promise<RunningExtensionsState> => {
  const { extensions, platform } = state
  const issuesUrl = getIssuesUrl(extensions[index]?.repository)
  if (!issuesUrl) {
    await RendererWorker.confirm(RunningExtensionsStrings.reportingIssuesNotSupported())
    return state
  }
  const cmd = getOpenCommand(platform)
  await applyOpenCommand(cmd, issuesUrl)
  return state
}
