import { expect, test } from '@jest/globals'
import { handleBlur } from '../src/parts/HandleBlur/HandleBlur.ts'

test('clears the context menu focus outline', () => {
  const state = {
    focusedIndex: 1,
    focusOutline: true,
  } as any

  expect(handleBlur(state)).toEqual({
    focusedIndex: 1,
    focusOutline: false,
  })
})
