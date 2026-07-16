import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-replace-row'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'old.extension',
      name: 'Old Extension',
      version: '1.0.0',
    },
  ])
  const name = Locator('.RunningExtensionName')
  await expect(name).toHaveText('Old Extension')

  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 2,
      icon: '',
      id: 'new.extension',
      name: 'New Extension',
      version: '2.0.0',
    },
  ])

  const rows = Locator('.RunningExtension')
  const id = Locator('.RunningExtensionId')
  await expect(rows).toHaveCount(1)
  await expect(name).toHaveText('New Extension')
  await expect(id).toHaveText('new.extension')
}
