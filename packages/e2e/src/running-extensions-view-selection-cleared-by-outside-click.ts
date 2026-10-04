import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-cleared-by-outside-click'

export const test: Test = async ({ Command, expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' },
    { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' },
  ])
  await RunningExtensions.select(1)
  const selectedName = RunningExtensions.root().locator('.RunningExtension.ExtensionActive .RunningExtensionName')
  await expect(selectedName).toHaveText('Second')

  await Command.execute('RunningExtensions.handleClickAt', 10_000)

  const activeRow = RunningExtensions.root().locator('.ExtensionActive')
  await expect(activeRow).toHaveCount(0)
  await expect(RunningExtensions.rows()).toHaveCount(2)
}
