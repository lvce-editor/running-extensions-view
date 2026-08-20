import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { create } from '../src/parts/Create/Create.ts'
import { renderIncremental } from '../src/parts/RenderIncremental/RenderIncremental.ts'
import * as RunningExtensionsStates from '../src/parts/RunningExtensionsStates/RunningExtensionsStates.ts'

test('returns patches for changed extensions', () => {
  create(1, 'running-extensions://', 0, 0, 300, 400, 1, '/test/assets')
  const oldState = RunningExtensionsStates.get(1).newState
  const newState = {
    ...oldState,
    extensions: [
      {
        activationEvent: 'onStartupFinished',
        activationTime: 12,
        icon: '',
        id: 'sample.extension',
        name: 'Sample Extension',
        version: '1.0.0',
      },
    ],
    loaded: true,
  }

  const result = renderIncremental(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetPatches)
  expect(result[1]).toBe(1)
  expect(result[2]).toEqual(expect.any(Array))
  expect(result[2]).not.toHaveLength(0)
})
