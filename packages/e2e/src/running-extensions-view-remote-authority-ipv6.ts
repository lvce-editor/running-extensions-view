import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-remote-authority-ipv6'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      remoteAuthority: 'ssh-remote+[2001:db8::1]',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.remoteAuthority(0)).toHaveText('SSH: [2001:db8::1]')
}
