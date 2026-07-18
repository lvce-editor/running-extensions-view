import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-remote-ssh'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 12.6,
      icon: '/icons/sample.svg',
      id: 'sample.extension',
      name: 'Sample Extension',
      remoteAuthority: 'ssh-remote+89.167.102.168',
      version: '1.2.3',
    },
  ])

  const extension = Locator('.RunningExtension').first()
  await expect(extension.locator('.RunningExtensionRemoteAuthority')).toHaveText('SSH: 89.167.102.168')
}
