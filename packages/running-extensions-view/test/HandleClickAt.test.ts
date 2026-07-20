import { expect, test } from '@jest/globals'
import type { RunningExtensionsState } from '../src/parts/RunningExtensionsState/RunningExtensionsState.ts'
import { create } from '../src/parts/Create/Create.ts'
import { handleClickAt } from '../src/parts/HandleClickAt/HandleClickAt.ts'
import * as RunningExtensionsStates from '../src/parts/RunningExtensionsStates/RunningExtensionsStates.ts'
import { setExtensions } from '../src/parts/SetExtensions/SetExtensions.ts'

const createState = (): RunningExtensionsState => {
  create(1, 'running-extensions://', 10, 20, 300, 400, 1, '/test/assets')
  const state = RunningExtensionsStates.get(1).newState
  return setExtensions(
    state,
    [0, 1].map((index) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.extension-${index}`,
      name: `Extension ${index}`,
      version: '1.0.0',
    })),
  )
}

test('selects an extension based on the fixed item height', () => {
  const state = createState()
  const { itemHeight, y } = state
  const newState = handleClickAt({ ...state, focusedIndex: 0, focusOutline: true }, y + itemHeight + 1)
  expect(newState.selectedIndex).toBe(1)
  expect(newState.focusedIndex).toBe(0)
  expect(newState.focusOutline).toBe(false)
})

test('clears the selection when clicking outside an extension', () => {
  const state = { ...createState(), focusOutline: true }
  const { extensions, itemHeight, y } = state
  expect(handleClickAt(state, y - 1)).toMatchObject({ focusOutline: false, selectedIndex: -1 })
  expect(handleClickAt(state, y + itemHeight * extensions.length)).toMatchObject({ focusOutline: false, selectedIndex: -1 })
})
