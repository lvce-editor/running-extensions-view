import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-many-rows'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extensions = Array.from({ length: 10 }, (_, index) => ({
    activationEvent: 'onStartupFinished',
    activationTime: index,
    icon: '',
    id: `sample.extension-${index}`,
    name: `Extension ${index}`,
    version: `1.0.${index}`,
  }))
  await RunningExtensions.show()
  await RunningExtensions.setExtensions(extensions)

  await expect(RunningExtensions.rows()).toHaveCount(10)
  await expect(RunningExtensions.name(9)).toHaveText('Extension 9')
  await expect(RunningExtensions.version(9)).toHaveText('1.0.9')
}
