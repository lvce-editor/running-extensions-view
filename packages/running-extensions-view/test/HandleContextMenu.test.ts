import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

const state = {
  extensions: [{ id: 'sample.extension' }, { id: 'other.extension' }],
  focusedIndex: -1,
  uid: 7,
} as any

test('shows the context menu for the selected extension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  await expect(handleContextMenu(state, '1', 10, 20)).resolves.toEqual({
    ...state,
    focusedIndex: 1,
  })
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 7, MenuEntryId.RunningExtensions, 10, 20, { menuId: MenuEntryId.RunningExtensions }]])
})

test('uses default coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  await handleContextMenu(state, 0)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 7, MenuEntryId.RunningExtensions, 0, 0, { menuId: MenuEntryId.RunningExtensions }]])
})

test('ignores an invalid index', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  await expect(handleContextMenu(state, 4, 10, 20)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
