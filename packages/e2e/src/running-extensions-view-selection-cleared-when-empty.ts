import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-cleared-when-empty'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon: '', id: 'sample.extension', name: 'Sample Extension', version: '1.0.0' },
  ])
  await RunningExtensions.select(0)
  const selectedName = RunningExtensions.root().locator('.RunningExtension.ExtensionActive .RunningExtensionName')
  await expect(selectedName).toHaveText('Sample Extension')

  await RunningExtensions.setExtensions([])

  await expect(RunningExtensions.rows()).toHaveCount(0)
  const activeRow = RunningExtensions.root().locator('.ExtensionActive')
  await expect(activeRow).toHaveCount(0)
  await expect(RunningExtensions.emptyMessage()).toHaveText('No running extensions')
}
