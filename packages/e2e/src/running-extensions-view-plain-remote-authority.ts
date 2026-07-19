import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-plain-remote-authority'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      remoteAuthority: 'remote.example.com',
      version: '1.0.0',
    },
  ])

  const remoteAuthority = Locator('.RunningExtensionRemoteAuthority')
  await expect(remoteAuthority).toHaveText('SSH: remote.example.com')
}
