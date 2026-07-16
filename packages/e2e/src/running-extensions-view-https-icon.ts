import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-https-icon'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const icon = 'https://example.com/extension-icon.svg'
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon,
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  const image = Locator('img.RunningExtensionIcon')
  const defaultIcon = Locator('.RunningExtensionDefaultIcon')
  await expect(image).toHaveCount(1)
  await expect(image).toHaveAttribute('src', icon)
  await expect(defaultIcon).toHaveCount(0)
}
