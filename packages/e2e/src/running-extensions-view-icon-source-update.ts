import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-icon-source-update'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '/icons/first.svg',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.icon(0)).toHaveAttribute('src', '/icons/first.svg')

  await RunningExtensions.setExtensions([{ ...extension, icon: '/icons/second.svg' }])

  await expect(RunningExtensions.icon(0)).toHaveAttribute('src', '/icons/second.svg')
  await expect(RunningExtensions.defaultIcon(0)).toHaveCount(0)
}
