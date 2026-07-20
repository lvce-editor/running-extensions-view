import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const handleBlur = (state: RunningExtensionsState): RunningExtensionsState => {
  return {
    ...state,
    focusOutline: false,
  }
}
