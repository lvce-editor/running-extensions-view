import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

const state = {
  extensions: [{ id: 'sample.extension' }, { id: 'other.extension' }],
  focusedIndex: -1,
  focusOutline: false,
  itemHeight: 20,
  uid: 7,
  y: 100,
} as any

test('shows the context menu for the selected extension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  await expect(handleContextMenu(state, 10, 120)).resolves.toEqual({
    ...state,
    focusedIndex: 1,
    focusOutline: true,
  })
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 7, MenuEntryId.RunningExtensions, 10, 120, { menuId: MenuEntryId.RunningExtensions }]])
})

test('shows the context menu for the first extension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  await handleContextMenu(state, 0, 100)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 7, MenuEntryId.RunningExtensions, 0, 100, { menuId: MenuEntryId.RunningExtensions }]])
})

test('ignores an event outside the list', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  await expect(handleContextMenu(state, 10, 180)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
