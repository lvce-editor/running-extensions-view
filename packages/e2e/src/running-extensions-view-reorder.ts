import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-reorder'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const first = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'first.extension',
    name: 'First',
    version: '1.0.0',
  }
  const second = {
    activationEvent: 'onStartupFinished',
    activationTime: 2,
    icon: '',
    id: 'second.extension',
    name: 'Second',
    version: '2.0.0',
  }
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [first, second])

  const rows = Locator('.RunningExtension')
  const firstRow = rows.nth(0)
  const secondRow = rows.nth(1)
  const firstId = firstRow.locator('.RunningExtensionId')
  const firstVersion = firstRow.locator('.RunningExtensionVersion')
  const secondId = secondRow.locator('.RunningExtensionId')
  const secondVersion = secondRow.locator('.RunningExtensionVersion')
  await expect(firstId).toHaveText('first.extension')
  await expect(secondId).toHaveText('second.extension')

  await Command.execute('RunningExtensions.setExtensions', [second, first])

  await expect(firstId).toHaveText('second.extension')
  await expect(firstVersion).toHaveText('2.0.0')
  await expect(secondId).toHaveText('first.extension')
  await expect(secondVersion).toHaveText('1.0.0')
}
