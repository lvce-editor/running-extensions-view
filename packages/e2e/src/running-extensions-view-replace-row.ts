import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-replace-row'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'old.extension',
      name: 'Old Extension',
      version: '1.0.0',
    },
  ])
  await expect(RunningExtensions.name(0)).toHaveText('Old Extension')

  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 2,
      icon: '',
      id: 'new.extension',
      name: 'New Extension',
      version: '2.0.0',
    },
  ])

  await expect(RunningExtensions.rows()).toHaveCount(1)
  await expect(RunningExtensions.name(0)).toHaveText('New Extension')
  await expect(RunningExtensions.id(0)).toHaveText('new.extension')
}
