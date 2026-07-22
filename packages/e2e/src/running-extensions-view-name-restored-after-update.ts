import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-name-restored-after-update'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: '',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: '',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.name(0)).toHaveText('sample.extension')

  await RunningExtensions.setExtensions([{ ...extension, name: 'Sample Extension' }])

  await expect(RunningExtensions.name(0)).toHaveText('Sample Extension')
  await expect(RunningExtensions.id(0)).toHaveText('sample.extension')
}
