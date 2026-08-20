import { expect, test } from '@jest/globals'
import type { RunningExtension } from '../src/parts/RunningExtension/RunningExtension.ts'
import { setExtensions } from '../src/parts/SetExtensions/SetExtensions.ts'

const createExtension = (id: string, name: unknown): RunningExtension => {
  return {
    activationEvent: 'onCommand:test.running-extension',
    activationTime: 1,
    icon: '',
    id,
    name,
    version: '1.0.0',
  }
}

test('sets the running extensions in alphabetical order', () => {
  const state = {
    extensions: [],
    focusedIndex: -1,
  } as any
  const extensions = [createExtension('test.zebra', 'Zebra'), createExtension('test.alpha', 'Alpha')]

  expect(setExtensions(state, extensions)).toEqual({
    ...state,
    extensions: [extensions[1], extensions[0]],
  })
  expect(extensions[0].id).toBe('test.zebra')
  expect(extensions[1].id).toBe('test.alpha')
})

test('falls back to the extension id when the name is missing', () => {
  const state = {
    extensions: [],
  } as any
  const extensions = [createExtension('test.zebra', ''), createExtension('test.alpha', undefined)]

  expect(setExtensions(state, extensions).extensions).toEqual([extensions[1], extensions[0]])
})

test('sorts duplicate names by extension id', () => {
  const state = {
    extensions: [],
  } as any
  const extensions = [createExtension('test.zebra', 'Shared Name'), createExtension('test.alpha', 'Shared Name')]

  expect(setExtensions(state, extensions).extensions).toEqual([extensions[1], extensions[0]])
})
