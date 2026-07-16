import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-update'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  const extension = Locator('.RunningExtension')
  await expect(extension).toHaveCount(1)
  await expect(extension.locator('.RunningExtensionName')).toHaveText('Sample Extension')

  await Command.execute('RunningExtensions.setExtensions', [])

  await expect(extension).toHaveCount(0)
  const emptyMessage = Locator('.RunningExtensionsEmpty')
  await expect(emptyMessage).toBeVisible()
  await expect(emptyMessage).toHaveText('No running extensions')
}
