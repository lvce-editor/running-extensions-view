import { ViewletCommand } from '@lvce-editor/constants'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import { getRunningExtensionsVirtualDom } from '../GetRunningExtensionsVirtualDom/GetRunningExtensionsVirtualDom.ts'

export const renderDom = (oldState: RunningExtensionsState, newState: RunningExtensionsState): readonly any[] => {
  return [
    ViewletCommand.SetDom2,
    newState.uid,
    getRunningExtensionsVirtualDom(newState.extensions, newState.loaded, newState.focusedIndex, newState.selectedIndex),
  ]
}
