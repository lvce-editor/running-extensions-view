import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-remote-ssh'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
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

  await expect(RunningExtensions.remoteAuthority(0)).toHaveText('SSH: 89.167.102.168')
}
