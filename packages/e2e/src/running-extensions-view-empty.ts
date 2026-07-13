import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-empty'

export const test: Test = async ({ expect, Locator, Main }) => {
  await Main.openUri('running-extensions:///empty')

  const emptyMessage = Locator('.RunningExtensionsEmpty')
  await expect(emptyMessage).toBeVisible()
  await expect(emptyMessage).toHaveText('No running extensions')
}
