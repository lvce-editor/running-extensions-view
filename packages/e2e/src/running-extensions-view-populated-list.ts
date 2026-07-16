import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-populated-list'

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

  const list = Locator('.RunningExtensions')
  await expect(list).toBeVisible()
  await expect(list).toHaveAttribute('role', 'list')
  await expect(list.locator('.RunningExtension')).toHaveCount(1)
}
