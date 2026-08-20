import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as GetIndex from '../GetIndex/GetIndex.ts'

export const handleClickAt = (state: RunningExtensionsState, eventY: number): RunningExtensionsState => {
  const { extensions } = state
  const selectedIndex = GetIndex.getIndex(state, eventY)
  return {
    ...state,
    focusOutline: false,
    selectedIndex: extensions[selectedIndex] ? selectedIndex : -1,
  }
}
