import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-icon-custom-to-default'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '/icons/custom.svg',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.icon(0)).toHaveAttribute('src', '/icons/custom.svg')

  await RunningExtensions.setExtensions([{ ...extension, icon: '' }])

  await expect(RunningExtensions.icon(0)).toHaveCount(0)
  await expect(RunningExtensions.defaultIcon(0)).toBeVisible()
  await expect(RunningExtensions.defaultIcon(0)).toHaveAttribute('role', 'none')
}
