import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-html-like-version'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const version = '<img src=x onerror=alert("version")>'
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version,
    },
  ])

  await expect(RunningExtensions.version(0)).toHaveText(version)
  await expect(RunningExtensions.row(0).locator('img')).toHaveCount(0)
}
