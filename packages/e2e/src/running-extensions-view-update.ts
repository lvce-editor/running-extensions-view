import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-update'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.rows()).toHaveCount(1)
  await expect(RunningExtensions.name(0)).toHaveText('Sample Extension')

  await RunningExtensions.setExtensions([])

  await expect(RunningExtensions.rows()).toHaveCount(0)
  await expect(RunningExtensions.emptyMessage()).toBeVisible()
  await expect(RunningExtensions.emptyMessage()).toHaveText('No running extensions')
}
