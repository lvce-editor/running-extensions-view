import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-html-like-id'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const id = '<script>alert("id")</script>'
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id,
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.id(0)).toHaveText(id)
  await expect(RunningExtensions.row(0).locator('script')).toHaveCount(0)
}
