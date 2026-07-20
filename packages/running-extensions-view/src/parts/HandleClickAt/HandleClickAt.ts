import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const handleClickAt = (state: RunningExtensionsState, eventY: number): RunningExtensionsState => {
  const { extensions, itemHeight, y } = state
  const index = Math.floor((eventY - y) / itemHeight)
  return {
    ...state,
    focusOutline: false,
    selectedIndex: extensions[index] ? index : -1,
  }
}
