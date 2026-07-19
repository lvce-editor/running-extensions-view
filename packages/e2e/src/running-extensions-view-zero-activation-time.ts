import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-zero-activation-time'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 0,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  const activationTime = Locator('.RunningExtensionActivationTime')
  await expect(activationTime).toHaveText('Activation: 0ms')
}
