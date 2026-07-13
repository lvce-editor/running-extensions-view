import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import { getMenuEntryIds } from '../src/parts/GetMenuEntryIds/GetMenuEntryIds.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('returns the running extension menu', () => {
  const entries = getMenuEntries({ extensions: [{ id: 'sample.extension' }], focusedIndex: 0 } as any)
  expect(entries).toEqual([
    { args: [0], command: 'RunningExtensions.copyId', flags: MenuItemFlags.None, id: 'copyId', label: 'Copy id (sample.extension)' },
    { args: [0], command: 'RunningExtensions.reportIssue', flags: MenuItemFlags.None, id: 'reportIssue', label: 'Report Issue' },
    { command: '', flags: MenuItemFlags.Separator, id: 'separator1', label: '' },
    { args: [0], command: 'RunningExtensions.disableWorkspace', flags: MenuItemFlags.None, id: 'disableWorkspace', label: 'Disable (Workspace)' },
    { args: [0], command: 'RunningExtensions.disable', flags: MenuItemFlags.None, id: 'disable', label: 'Disable' },
    { command: '', flags: MenuItemFlags.Separator, id: 'separator2', label: '' },
    { command: 'RunningExtensions.startProfile', flags: MenuItemFlags.None, id: 'startProfile', label: 'Start Extension Host Profile' },
  ])
})

test('returns no entries without a focused extension', () => {
  expect(getMenuEntries({ extensions: [], focusedIndex: -1 } as any)).toEqual([])
})

test('returns the menu entry id', () => {
  expect(getMenuEntryIds()).toEqual([MenuEntryId.RunningExtensions])
})
