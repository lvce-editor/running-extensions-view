import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-data-icon'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const icon = 'data:image/svg+xml,icon'
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon,
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.icon(0)).toHaveAttribute('src', icon)
}
