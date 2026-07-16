import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-fallback'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: '',
      activationTime: 0,
      icon: '',
      id: 'sample.extension',
      name: '',
      version: '',
    },
  ])

  const extension = Locator('.RunningExtension').first()
  await expect(extension.locator('.RunningExtensionName')).toHaveText('sample.extension')

  const defaultIcon = extension.locator('.RunningExtensionDefaultIcon')
  await expect(defaultIcon).toBeVisible()
  await expect(defaultIcon).toHaveAttribute('role', 'none')
}
