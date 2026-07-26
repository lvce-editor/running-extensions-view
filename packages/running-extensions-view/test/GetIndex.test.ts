import { expect, test } from '@jest/globals'
import type { RunningExtensionsState } from '../src/parts/RunningExtensionsState/RunningExtensionsState.ts'
import { getIndex } from '../src/parts/GetIndex/GetIndex.ts'

const state = {
  itemHeight: 72,
  y: 20,
} as RunningExtensionsState

test('returns the first item index at the top of the list', () => {
  expect(getIndex(state, 20)).toBe(0)
})

test('returns the item index based on the row height', () => {
  expect(getIndex(state, 91)).toBe(0)
  expect(getIndex(state, 92)).toBe(1)
})

test('returns an index outside the list bounds', () => {
  expect(getIndex(state, 19)).toBe(-1)
  expect(getIndex(state, 164)).toBe(2)
})
