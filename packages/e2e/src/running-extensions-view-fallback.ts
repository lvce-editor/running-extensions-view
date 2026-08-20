import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-fallback'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: '',
      activationTime: 0,
      icon: '',
      id: 'sample.extension',
      name: '',
      version: '',
    },
  ])

  await expect(RunningExtensions.name(0)).toHaveText('sample.extension')
  await expect(RunningExtensions.defaultIcon(0)).toBeVisible()
  await expect(RunningExtensions.defaultIcon(0)).toHaveAttribute('role', 'none')
}
