import { expect, test, beforeAll } from '@jest/globals'
import * as GetAboutDetailStringWeb from '../src/parts/GetAboutDetailStringWeb/GetAboutDetailStringWeb.ts'

beforeAll(() => {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      userAgent: 'Test',
    },
  })
})

test('getDetailStringWeb', () => {
  expect(GetAboutDetailStringWeb.getDetailStringWeb()).toEqual(['Version: 0.0.0-dev', 'Commit: unknown commit', 'Date: unknown', 'Browser: Test'])
})
