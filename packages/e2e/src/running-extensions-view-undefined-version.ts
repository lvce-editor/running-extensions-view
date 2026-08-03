import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-undefined-version'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: 'undefined',
    },
  ])

  await expect(RunningExtensions.name(0)).toHaveText('Sample Extension')
  await expect(RunningExtensions.version(0)).toHaveText('')
}
