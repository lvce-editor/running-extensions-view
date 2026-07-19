import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-duplicate-names'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'first.extension',
      name: 'Shared Name',
      version: '1.0.0',
    },
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'second.extension',
      name: 'Shared Name',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.id(0)).toHaveText('first.extension')
  await expect(RunningExtensions.id(1)).toHaveText('second.extension')
}
