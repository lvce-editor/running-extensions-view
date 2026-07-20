import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-order'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions(
    ['First', 'Second', 'Third'].map((name) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.${name.toLowerCase()}`,
      name,
      version: '1.0.0',
    })),
  )

  await expect(RunningExtensions.name(0)).toHaveText('First')
  await expect(RunningExtensions.name(1)).toHaveText('Second')
  await expect(RunningExtensions.name(2)).toHaveText('Third')
}
