import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-data-icon'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const icon = 'data:image/svg+xml,icon'
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
  await expect(image).toHaveAttribute('src', icon)
}
