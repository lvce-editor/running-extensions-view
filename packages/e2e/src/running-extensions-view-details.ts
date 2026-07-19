import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-details'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 12.6,
      icon: '/icons/sample.svg',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.2.3',
    },
    {
      activationEvent: 'onCommand:another.run',
      activationTime: 4.2,
      icon: '',
      id: 'another.extension',
      name: 'Another Extension',
      version: '2.0.0',
    },
  ])

  const extensions = Locator('.RunningExtension')
  await expect(extensions).toHaveCount(2)

  const firstExtension = Locator('.RunningExtension[data-index="0"]')
  await expect(firstExtension).toHaveAttribute('role', 'listitem')
  await expect(firstExtension.locator('.RunningExtensionName')).toHaveText('Sample Extension')
  await expect(firstExtension.locator('.RunningExtensionVersion')).toHaveText('1.2.3')
  await expect(firstExtension.locator('.RunningExtensionId')).toHaveText('sample.extension')
  await expect(firstExtension.locator('.RunningExtensionActivationTime')).toHaveText('Activation: 13ms')
  await expect(firstExtension.locator('.RunningExtensionActivationReason')).toHaveText('Activation reason: onStartupFinished')
  await expect(firstExtension.locator('.RunningExtensionIcon')).toHaveAttribute('src', '/icons/sample.svg')

  const secondExtension = Locator('.RunningExtension[data-index="1"]')
  await expect(secondExtension).toHaveAttribute('role', 'listitem')
  await expect(secondExtension.locator('.RunningExtensionName')).toHaveText('Another Extension')
  await expect(secondExtension.locator('.RunningExtensionActivationTime')).toHaveText('Activation: 4ms')
  await expect(secondExtension.locator('.RunningExtensionActivationReason')).toHaveText('Activation reason: onCommand:another.run')
}
