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
  await expect(row.locator('.RunningExtensionDefaultIcon')).toHaveCount(1)
  await expect(row.locator('.RunningExtensionActivationReason')).toHaveCount(0)

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

  await expect(row.locator('.RunningExtensionName')).toHaveText('Updated Extension')
  await expect(row.locator('.RunningExtensionVersion')).toHaveText('2.0.0')
  await expect(row.locator('.RunningExtensionActivationTime')).toHaveText('Activation: 8ms')
  await expect(row.locator('.RunningExtensionActivationReason')).toHaveText('Activation reason: onCommand:sample.run')
  await expect(row.locator('img.RunningExtensionIcon')).toHaveAttribute('src', '/icons/updated.svg')
  await expect(row.locator('.RunningExtensionDefaultIcon')).toHaveCount(0)
}
