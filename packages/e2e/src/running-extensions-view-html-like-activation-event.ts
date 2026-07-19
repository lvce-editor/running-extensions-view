import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-html-like-activation-event'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const activationEvent = 'onCommand:<script>alert("test")</script>'
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent,
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  const activationReason = Locator('.RunningExtensionActivationReason')
  const script = activationReason.locator('script')
  await expect(activationReason).toHaveText(`Activation reason: ${activationEvent}`)
  await expect(script).toHaveCount(0)
}
