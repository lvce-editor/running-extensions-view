import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-empty-remote-authority'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      remoteAuthority: '',
      version: '1.0.0',
    },
  ])

  const row = Locator('.RunningExtension')
  const remoteAuthority = row.locator('.RunningExtensionRemoteAuthority')
  const extensionId = row.locator('.RunningExtensionId')
  await expect(remoteAuthority).toHaveCount(0)
  await expect(extensionId).toHaveText('sample.extension')
}
