import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as GetIndex from '../GetIndex/GetIndex.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const handleContextMenu = async (state: RunningExtensionsState, eventX: number, eventY: number): Promise<RunningExtensionsState> => {
  const { extensions, uid } = state
  const focusedIndex = GetIndex.getIndex(state, eventY)
  if (!extensions[focusedIndex]) {
    return state
  }
  const newState = {
    ...state,
    focusedIndex,
    focusOutline: true,
  }
  RunningExtensionsStates.set(uid, state, newState)
  await ContextMenu.show(uid, MenuEntryId.RunningExtensions, eventX, eventY, {
    menuId: MenuEntryId.RunningExtensions,
  })
  return newState
}
