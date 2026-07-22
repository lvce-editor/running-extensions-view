import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import { getRunningExtensionsVirtualDom } from '../GetRunningExtensionsVirtualDom/GetRunningExtensionsVirtualDom.ts'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const renderIncremental = (oldState: RunningExtensionsState, newState: RunningExtensionsState): readonly any[] => {
  const oldDom = getRunningExtensionsVirtualDom(
    oldState.extensions,
    oldState.loaded,
    oldState.focusedIndex,
    oldState.selectedIndex,
    oldState.focusOutline,
  )
  const newDom = getRunningExtensionsVirtualDom(
    newState.extensions,
    newState.loaded,
    newState.focusedIndex,
    newState.selectedIndex,
    newState.focusOutline,
  )
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
