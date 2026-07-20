import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-duplicate-ids'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'shared.extension',
      name: 'First Instance',
      version: '1.0.0',
    },
    {
      activationEvent: 'onCommand:second.run',
      activationTime: 2,
      icon: '',
      id: 'shared.extension',
      name: 'Second Instance',
      version: '2.0.0',
    },
  ])

  await expect(RunningExtensions.rows()).toHaveCount(2)
  await expect(RunningExtensions.name(0)).toHaveText('First Instance')
  await expect(RunningExtensions.name(1)).toHaveText('Second Instance')
  await expect(RunningExtensions.id(0)).toHaveText('shared.extension')
  await expect(RunningExtensions.id(1)).toHaveText('shared.extension')
}
