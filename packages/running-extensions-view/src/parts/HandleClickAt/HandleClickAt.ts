import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

const getIndex = (eventY: number, y: number, itemHeight: number): number => {
  const index = Math.floor((eventY - y) / itemHeight)
  return index
}

export const handleClickAt = (state: RunningExtensionsState, eventY: number): RunningExtensionsState => {
  const { extensions, itemHeight, y } = state
  const index = getIndex(eventY, y, itemHeight)
  return {
    ...state,
    focusOutline: false,
    selectedIndex: extensions[index] ? index : -1,
  }
}
