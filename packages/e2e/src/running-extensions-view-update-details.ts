import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-update-details'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: '',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  const row = Locator('.RunningExtension')
  const defaultIcon = row.locator('.RunningExtensionDefaultIcon')
  const activationReason = row.locator('.RunningExtensionActivationReason')
  await expect(defaultIcon).toHaveCount(1)
  await expect(activationReason).toHaveCount(0)

  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onCommand:sample.run',
      activationTime: 7.6,
      icon: '/icons/updated.svg',
      id: 'sample.extension',
      name: 'Updated Extension',
      version: '2.0.0',
    },
  ])

  const extensionName = row.locator('.RunningExtensionName')
  const extensionVersion = row.locator('.RunningExtensionVersion')
  const activationTime = row.locator('.RunningExtensionActivationTime')
  const extensionIcon = row.locator('img.RunningExtensionIcon')
  await expect(extensionName).toHaveText('Updated Extension')
  await expect(extensionVersion).toHaveText('2.0.0')
  await expect(activationTime).toHaveText('Activation: 8ms')
  await expect(activationReason).toHaveText('Activation reason: onCommand:sample.run')
  await expect(extensionIcon).toHaveAttribute('src', '/icons/updated.svg')
  await expect(defaultIcon).toHaveCount(0)
}
