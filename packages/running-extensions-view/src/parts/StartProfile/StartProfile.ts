import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

export const startProfile = async (state: RunningExtensionsState): Promise<RunningExtensionsState> => {
  await RendererWorker.confirm(RunningExtensionsStrings.extensionHostProfilingNotAvailable())
  return state
}
