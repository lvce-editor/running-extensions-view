import { DialogWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

export const startProfile = async (state: RunningExtensionsState): Promise<RunningExtensionsState> => {
  await DialogWorker.invoke('ConfirmPrompt.prompt', RunningExtensionsStrings.extensionHostProfilingNotAvailable(), undefined)
  return state
}
