import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-activation-reason-removed'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: 'onCommand:sample.run',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.activationReason(0)).toHaveText('Activation reason: onCommand:sample.run')

  await RunningExtensions.setExtensions([{ ...extension, activationEvent: '' }])

  await expect(RunningExtensions.activationReason(0)).toHaveCount(0)
  await expect(RunningExtensions.activationTime(0)).toHaveText('Activation: 1ms')
}
