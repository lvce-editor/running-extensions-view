import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { create } from '../src/parts/Create/Create.ts'
import { isCssEqual, isDomEqual } from '../src/parts/DiffModules/DiffModules.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import { resize } from '../src/parts/Resize/Resize.ts'
import * as RunningExtensionsStates from '../src/parts/RunningExtensionsStates/RunningExtensionsStates.ts'

test('create registers the initial state', () => {
  create(1, 'running-extensions://', 10, 20, 300, 400)
  expect(RunningExtensionsStates.get(1).newState).toMatchObject({ extensions: [], height: 400, loaded: false, uid: 1, width: 300, x: 10, y: 20 })
})

test('resize updates dimensions', () => {
  create(2, '', 0, 0, 100, 100)
  const state = RunningExtensionsStates.get(2).newState
  expect(resize(state, { height: 250, width: 500, x: 5, y: 6 })).toMatchObject({ height: 250, width: 500, x: 5, y: 6 })
})

test('diff helpers compare dom and css fields', () => {
  create(3, '', 0, 0, 100, 100)
  const state = RunningExtensionsStates.get(3).newState
  expect(isDomEqual(state, state)).toBe(true)
  expect(isDomEqual(state, { ...state, loaded: true })).toBe(false)
  expect(isCssEqual(state, state)).toBe(true)
  expect(isCssEqual(state, { ...state, width: 200 })).toBe(false)
})

test('renderCss emits dimensions', () => {
  create(4, '', 0, 0, 320, 240)
  const state = RunningExtensionsStates.get(4).newState
  expect(renderCss(state, state)).toEqual([ViewletCommand.SetCss, 4, 'width: 320px; height: 240px;'])
})
