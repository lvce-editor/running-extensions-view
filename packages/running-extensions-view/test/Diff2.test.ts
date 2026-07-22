import { expect, test } from '@jest/globals'
import { create } from '../src/parts/Create/Create.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as RunningExtensionsStates from '../src/parts/RunningExtensionsStates/RunningExtensionsStates.ts'

test('uses incremental rendering when the dom changes', () => {
  create(1, 'running-extensions://', 0, 0, 300, 400, 1, '/test/assets')
  const oldState = RunningExtensionsStates.get(1).newState
  const newState = {
    ...oldState,
    loaded: true,
  }
  RunningExtensionsStates.set(1, oldState, newState)

  expect(diff2(1)).toEqual([DiffType.RenderIncremental])
})
