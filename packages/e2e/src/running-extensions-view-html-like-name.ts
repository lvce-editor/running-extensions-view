import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-html-like-name'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const htmlLikeName = '<script>alert("test")</script>'
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: htmlLikeName,
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.name(0)).toHaveText(htmlLikeName)
  await expect(RunningExtensions.row(0).locator('script')).toHaveCount(0)
}
