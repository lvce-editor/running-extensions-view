import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-html-like-remote-authority'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const remoteAuthority = '<script>alert("remote")</script>'
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      remoteAuthority,
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.remoteAuthority(0)).toHaveText(`SSH: ${remoteAuthority}`)
  await expect(RunningExtensions.row(0).locator('script')).toHaveCount(0)
}
