import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const handleClickAt = (state: RunningExtensionsState, index: number | string): RunningExtensionsState => {
  const { extensions } = state
  const selectedIndex = Number(index)
  return {
    ...state,
    focusOutline: false,
    selectedIndex: extensions[selectedIndex] ? selectedIndex : -1,
  }
}
