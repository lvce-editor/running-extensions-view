import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-empty-to-populated'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [])
  const emptyMessage = Locator('.RunningExtensionsEmpty')
  await expect(emptyMessage).toHaveText('No running extensions')

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

  const name = Locator('.RunningExtensionName')
  await expect(emptyMessage).toHaveCount(0)
  await expect(name).toHaveText('Sample Extension')
}
