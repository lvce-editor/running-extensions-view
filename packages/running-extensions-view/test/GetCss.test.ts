import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'

test('returns dimensions', () => {
  expect(getCss(320, 240)).toBe('width: 320px; height: 240px;')
})
