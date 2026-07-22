import { expect, test } from '@jest/globals'
import { create } from '../src/parts/Create/Create.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as RunningExtensionsStates from '../src/parts/RunningExtensionsStates/RunningExtensionsStates.ts'

test('uses full rendering for the initial dom', () => {
  create(1, 'running-extensions://', 0, 0, 300, 400, 1, '/test/assets')
  const oldState = RunningExtensionsStates.get(1).newState
  const newState = {
    ...oldState,
    loaded: true,
  }
  RunningExtensionsStates.set(1, oldState, newState)

  expect(diff2(1)).toEqual([DiffType.RenderDom])
})

test('uses incremental rendering after the initial dom', () => {
  create(2, 'running-extensions://', 0, 0, 300, 400, 1, '/test/assets')
  const initialState = RunningExtensionsStates.get(2).newState
  const oldState = {
    ...initialState,
    loaded: true,
  }
  const newState = {
    ...oldState,
    focusOutline: true,
  }
  RunningExtensionsStates.set(2, oldState, newState)

  expect(diff2(2)).toEqual([DiffType.RenderIncremental])
})
