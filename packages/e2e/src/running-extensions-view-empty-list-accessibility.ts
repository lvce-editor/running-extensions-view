import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-empty-list-accessibility'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([])

  await expect(RunningExtensions.root()).toHaveAttribute('role', 'list')
  await expect(RunningExtensions.root()).toHaveCSS('flex-grow', '1')
  await expect(RunningExtensions.emptyMessage()).toBeVisible()
  await expect(RunningExtensions.rows()).toHaveCount(0)
}
