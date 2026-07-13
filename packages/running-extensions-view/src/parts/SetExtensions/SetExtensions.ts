import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const setExtensions = (state: RunningExtensionsState, extensions: readonly RunningExtension[]): RunningExtensionsState => {
  return {
    ...state,
    extensions,
  }
}
