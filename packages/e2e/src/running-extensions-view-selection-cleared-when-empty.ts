import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-cleared-when-empty'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon: '', id: 'sample.extension', name: 'Sample Extension', version: '1.0.0' },
  ])
  await RunningExtensions.select(0)
  await expect(RunningExtensions.selectedRow(0)).toHaveCount(1)

  await RunningExtensions.setExtensions([])

  await expect(RunningExtensions.rows()).toHaveCount(0)
  await expect(RunningExtensions.root().locator('.ExtensionActive')).toHaveCount(0)
  await expect(RunningExtensions.emptyMessage()).toHaveText('No running extensions')
}
