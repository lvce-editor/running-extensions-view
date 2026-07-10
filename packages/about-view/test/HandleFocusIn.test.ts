import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { AboutState } from '../src/parts/AboutState/AboutState.ts'
import * as AboutFocusId from '../src/parts/AboutFocusId/AboutFocusId.ts'
import * as HandleFocusIn from '../src/parts/HandleFocusIn/HandleFocusIn.ts'

test('handleFocusIn - when focusId exists', async () => {
  const state: AboutState = {
    focusId: AboutFocusId.Ok,
    lines: ['Version: 1.0.0', 'Commit: abc'],
    productName: 'Test Editor',
    uid: 1,
    useNewLoadConfig: false,
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus'(value: number): void {
      if (value !== 4) {
        throw new Error('unexpected method Focus.setFocus')
      }
    },
  })
  const newState = await HandleFocusIn.handleFocusIn(state)
  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([['Focus.setFocus', 4]])
})

test('handleFocusIn - when focusId is None', async () => {
  const state: AboutState = {
    focusId: AboutFocusId.None,
    lines: ['Version: 1.0.0', 'Commit: abc'],
    productName: 'Test Editor',
    uid: 1,
    useNewLoadConfig: false,
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus'(value: number): void {
      if (value !== 4) {
        throw new Error('unexpected method Focus.setFocus')
      }
    },
  })
  const newState = await HandleFocusIn.handleFocusIn(state)
  expect(newState).toEqual({
    ...state,
    focusId: AboutFocusId.Ok,
  })
  expect(mockRpc.invocations).toEqual([['Focus.setFocus', 4]])
})

test('handleFocusIn - when focusId is Copy', async () => {
  const state: AboutState = {
    focusId: AboutFocusId.Copy,
    lines: ['Version: 1.0.0', 'Commit: abc'],
    productName: 'Test Editor',
    uid: 1,
    useNewLoadConfig: false,
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus'(value: number): void {
      if (value !== 4) {
        throw new Error('unexpected method Focus.setFocus')
      }
    },
  })
  const newState = await HandleFocusIn.handleFocusIn(state)
  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([['Focus.setFocus', 4]])
})
