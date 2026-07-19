import { MenuItemFlags, PlatformType } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const getMenuEntries = (state: RunningExtensionsState): readonly MenuEntry[] => {
  const { extensions, focusedIndex, platform } = state
  const extension = extensions[focusedIndex]
  if (!extension) {
    return []
  }
  const args = [focusedIndex]
  const menuEntries: MenuEntry[] = [
    {
      args,
      command: 'RunningExtensions.copyId',
      flags: MenuItemFlags.None,
      id: 'copyId',
      label: RunningExtensionsStrings.copyId(extension.id),
    },
    {
      args,
      command: 'RunningExtensions.reportIssue',
      flags: MenuItemFlags.None,
      id: 'reportIssue',
      label: RunningExtensionsStrings.reportIssue(),
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
      label: RunningExtensionsStrings.disableWorkspace(),
    },
    {
      args,
      command: 'RunningExtensions.disable',
      flags: MenuItemFlags.None,
      id: 'disable',
      label: RunningExtensionsStrings.disable(),
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
      label: RunningExtensionsStrings.startExtensionHostProfile(),
    },
  ]
  if (platform === PlatformType.Electron && extension.isolated) {
    menuEntries.push({
      args,
      command: 'RunningExtensions.takeHeapSnapshot',
      flags: MenuItemFlags.None,
      id: 'takeHeapSnapshot',
      label: RunningExtensionsStrings.takeHeapSnapshot(),
    })
  }
  return menuEntries
}
