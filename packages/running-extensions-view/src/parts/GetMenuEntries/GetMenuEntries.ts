import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const getMenuEntries = (state: RunningExtensionsState): readonly MenuEntry[] => {
  const extension = state.extensions[state.focusedIndex]
  if (!extension) {
    return []
  }
  const args = [state.focusedIndex]
  return [
    {
      args,
      command: 'RunningExtensions.copyId',
      flags: MenuItemFlags.None,
      id: 'copyId',
      label: `Copy id (${extension.id})`,
    },
    {
      args,
      command: 'RunningExtensions.reportIssue',
      flags: MenuItemFlags.None,
      id: 'reportIssue',
      label: 'Report Issue',
    },
    {
      command: '',
      flags: MenuItemFlags.Separator,
      id: 'separator1',
      label: '',
    },
    {
      args,
      command: 'RunningExtensions.disableWorkspace',
      flags: MenuItemFlags.None,
      id: 'disableWorkspace',
      label: 'Disable (Workspace)',
    },
    {
      args,
      command: 'RunningExtensions.disable',
      flags: MenuItemFlags.None,
      id: 'disable',
      label: 'Disable',
    },
    {
      command: '',
      flags: MenuItemFlags.Separator,
      id: 'separator2',
      label: '',
    },
    {
      command: 'RunningExtensions.startProfile',
      flags: MenuItemFlags.None,
      id: 'startProfile',
      label: 'Start Extension Host Profile',
    },
  ]
}
