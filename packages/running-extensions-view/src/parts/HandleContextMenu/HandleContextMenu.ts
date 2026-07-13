import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const handleContextMenu = async (
  state: RunningExtensionsState,
  index: number | string,
  x: number = 0,
  y: number = 0,
): Promise<RunningExtensionsState> => {
  const focusedIndex = Number(index)
  if (!state.extensions[focusedIndex]) {
    return state
  }
  const newState = {
    ...state,
    focusedIndex,
  }
  RunningExtensionsStates.set(state.uid, state, newState)
  await ContextMenu.show(state.uid, MenuEntryId.RunningExtensions, x, y, {
    menuId: MenuEntryId.RunningExtensions,
  })
  return newState
}
