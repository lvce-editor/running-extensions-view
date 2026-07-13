import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-basic'

export const test: Test = async ({ expect, Locator, Main }: TestApi) => {
  await Main.openUri('running-extensions:///1')

  const runningExtensions = Locator('.RunningExtensions')
  await expect(runningExtensions).toBeVisible()
  await expect(runningExtensions).toHaveAttribute('role', 'list')
}
