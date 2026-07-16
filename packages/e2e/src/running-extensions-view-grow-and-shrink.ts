import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-grow-and-shrink'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const first = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'first.extension',
    name: 'First',
    version: '1.0.0',
  }
  const second = { ...first, id: 'second.extension', name: 'Second' }
  const third = { ...first, id: 'third.extension', name: 'Third' }
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [first])

  const rows = Locator('.RunningExtension')
  await expect(rows).toHaveCount(1)
  await Command.execute('RunningExtensions.setExtensions', [first, second, third])
  await expect(rows).toHaveCount(3)
  await Command.execute('RunningExtensions.setExtensions', [third])
  await expect(rows).toHaveCount(1)
  const remainingRow = rows.first()
  const remainingName = remainingRow.locator('.RunningExtensionName')
  await expect(remainingName).toHaveText('Third')
}
