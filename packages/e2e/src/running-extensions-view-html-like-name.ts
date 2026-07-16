import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-html-like-name'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const htmlLikeName = '<script>alert("test")</script>'
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: htmlLikeName,
      version: '1.0.0',
    },
  ])

  const name = Locator('.RunningExtensionName')
  const script = Locator('.RunningExtension script')
  await expect(name).toHaveText(htmlLikeName)
  await expect(script).toHaveCount(0)
}
