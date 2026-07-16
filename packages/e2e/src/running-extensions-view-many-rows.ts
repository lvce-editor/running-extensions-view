import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-many-rows'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const extensions = Array.from({ length: 10 }, (_, index) => ({
    activationEvent: 'onStartupFinished',
    activationTime: index,
    icon: '',
    id: `sample.extension-${index}`,
    name: `Extension ${index}`,
    version: `1.0.${index}`,
  }))
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', extensions)

  const rows = Locator('.RunningExtension')
  await expect(rows).toHaveCount(10)
  const lastRow = rows.nth(9)
  const lastName = lastRow.locator('.RunningExtensionName')
  const lastVersion = lastRow.locator('.RunningExtensionVersion')
  await expect(lastName).toHaveText('Extension 9')
  await expect(lastVersion).toHaveText('1.0.9')
}
