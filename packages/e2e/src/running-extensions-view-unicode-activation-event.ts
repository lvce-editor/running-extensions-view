import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-unicode-activation-event'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const activationEvent = 'onCommand:扩展.启动-🚀'
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
