import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-empty'

export const test: Test = async ({ expect, Main, RunningExtensions }: TestApi) => {
  await Main.openUri('running-extensions:///empty')

  await expect(RunningExtensions.emptyMessage()).toBeVisible()
  await expect(RunningExtensions.emptyMessage()).toHaveText('No running extensions')
}
