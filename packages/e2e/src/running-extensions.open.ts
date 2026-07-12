import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions.open'

export const test: Test = async ({ expect, Locator, Main }) => {
  await Main.openUri('running-extensions:///open')

  const list = Locator('.RunningExtensions')
  await expect(list).toBeVisible()
  await expect(list).toHaveAttribute('role', 'list')
}
