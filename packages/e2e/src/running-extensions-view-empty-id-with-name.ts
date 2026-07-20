import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-empty-id-with-name'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: '',
      name: 'Extension Without Id',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.name(0)).toHaveText('Extension Without Id')
  await expect(RunningExtensions.id(0)).toHaveText('')
}
