import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-thousand-extensions'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const extensions = Array.from({ length: 1000 }, (_, index) => ({
    activationEvent: 'onStartupFinished',
    activationTime: index,
    icon: '',
    id: `sample.extension-${index}`,
    name: `Extension ${index}`,
    version: `1.0.${index}`,
  }))
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', extensions)

  const list = Locator('.RunningExtensions')
  const rows = list.locator('.RunningExtension')
  const firstRow = rows.first()
  const lastRow = rows.nth(999)
  await expect(rows).toHaveCount(1000)
  await expect(firstRow).toBeVisible()
  await expect(list).toHaveJSProperty('scrollTop', 0)

  await lastRow.hover()

  await expect(list).not.toHaveJSProperty('scrollTop', 0)
  await expect(lastRow).toBeVisible()
  await expect(lastRow.locator('.RunningExtensionName')).toHaveText('Extension 999')
  await expect(lastRow.locator('.RunningExtensionVersion')).toHaveText('1.0.999')
}
