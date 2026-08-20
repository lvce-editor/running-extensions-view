import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-blob-icon'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const icon = 'blob:https://example.com/0d0f96b6-13af-42c0-8a43-d7f77122ad18'
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
  await expect(RunningExtensions.defaultIcon(0)).toHaveCount(0)
}
