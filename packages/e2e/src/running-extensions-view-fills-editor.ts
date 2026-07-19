import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-fills-editor'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()

  await expect(RunningExtensions.root()).toBeVisible()
  await expect(RunningExtensions.root()).toHaveCSS('flex-grow', '1')
}
