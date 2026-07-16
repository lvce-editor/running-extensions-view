import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-duplicate-names'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'first.extension',
      name: 'Shared Name',
      version: '1.0.0',
    },
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'second.extension',
      name: 'Shared Name',
      version: '1.0.0',
    },
  ])

  const rows = Locator('.RunningExtension')
  const firstRow = rows.nth(0)
  const secondRow = rows.nth(1)
  const firstId = firstRow.locator('.RunningExtensionId')
  const secondId = secondRow.locator('.RunningExtensionId')
  await expect(firstId).toHaveText('first.extension')
  await expect(secondId).toHaveText('second.extension')
}
