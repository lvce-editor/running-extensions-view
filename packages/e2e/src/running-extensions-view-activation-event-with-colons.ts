import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-activation-event-with-colons'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const activationEvent = 'onUri:sample.extension://path:with:colons'
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent,
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.activationReason(0)).toHaveText(`Activation reason: ${activationEvent}`)
}
