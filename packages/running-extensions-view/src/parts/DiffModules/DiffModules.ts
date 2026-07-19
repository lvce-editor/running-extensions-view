import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const isDomEqual = (oldState: RunningExtensionsState, newState: RunningExtensionsState): boolean => {
  return (
    oldState.extensions === newState.extensions &&
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.loaded === newState.loaded &&
    oldState.selectedIndex === newState.selectedIndex
  )
}

export const isCssEqual = (oldState: RunningExtensionsState, newState: RunningExtensionsState): boolean => {
  return oldState.width === newState.width && oldState.height === newState.height
}
