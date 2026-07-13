import { expect, test } from '@jest/globals'
import { setExtensions } from '../src/parts/SetExtensions/SetExtensions.ts'

test('sets the running extensions', () => {
  const state = {
    extensions: [],
    focusedIndex: -1,
  } as any
  const extensions = [
    {
      activationEvent: 'onCommand:test.running-extension',
      activationTime: 1,
      icon: '',
      id: 'test.running-extension',
      name: 'Running Extension',
      version: '1.0.0',
    },
  ]

  expect(setExtensions(state, extensions)).toEqual({
    ...state,
    extensions,
  })
})
