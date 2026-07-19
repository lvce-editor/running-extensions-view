import { expect, test } from '@jest/globals'
import { getIssuesUrl } from '../src/parts/GetIssuesUrl/GetIssuesUrl.ts'

test('returns the GitHub issues URL', () => {
  expect(getIssuesUrl('https://github.com/lvce-editor/running-extensions-view')).toBe('https://github.com/lvce-editor/running-extensions-view/issues')
})

test('normalizes a trailing slash', () => {
  expect(getIssuesUrl('https://github.com/lvce-editor/running-extensions-view/')).toBe(
    'https://github.com/lvce-editor/running-extensions-view/issues',
  )
})

test('normalizes a git suffix', () => {
  expect(getIssuesUrl('https://github.com/lvce-editor/running-extensions-view.git')).toBe(
    'https://github.com/lvce-editor/running-extensions-view/issues',
  )
})

test('uses the repository root for a nested GitHub URL', () => {
  expect(getIssuesUrl('https://github.com/lvce-editor/running-extensions-view/tree/main')).toBe(
    'https://github.com/lvce-editor/running-extensions-view/issues',
  )
})

test.each([
  undefined,
  null,
  1,
  '',
  'not-a-url',
  // eslint-disable-next-line unicorn/prefer-https -- Insecure repository URLs must be rejected.
  'http://github.com/lvce-editor/running-extensions-view',
  'https://gitlab.com/lvce-editor/running-extensions-view',
  'https://github.com',
  'https://github.com/lvce-editor',
  'https://github.com/lvce-editor/.git',
])('returns an empty string for an unsupported repository: %p', (repository) => {
  expect(getIssuesUrl(repository)).toBe('')
})
