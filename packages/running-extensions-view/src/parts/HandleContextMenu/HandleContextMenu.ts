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
  const { extensions, uid } = state
  const focusedIndex = Number(index)
  if (!extensions[focusedIndex]) {
    return state
  }
  const newState = {
    ...state,
    focusedIndex,
  }
  RunningExtensionsStates.set(uid, state, newState)
  await ContextMenu.show(uid, MenuEntryId.RunningExtensions, x, y, {
    menuId: MenuEntryId.RunningExtensions,
  })
  return newState
}
