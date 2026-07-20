import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-fallback-name-after-update'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.name(0)).toHaveText('Sample Extension')

  await RunningExtensions.setExtensions([{ ...extension, name: '' }])

  await expect(RunningExtensions.name(0)).toHaveText('sample.extension')
  await expect(RunningExtensions.id(0)).toHaveText('sample.extension')
}
