import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-empty-activation-event'

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

  const activationDetails = Locator('.RunningExtensionActivationDetails')
  const activationReason = activationDetails.locator('.RunningExtensionActivationReason')
  await expect(activationDetails.locator('.RunningExtensionActivationTime')).toHaveText('Activation: 1ms')
  await expect(activationReason).toHaveCount(0)
}
