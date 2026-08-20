import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-unicode-remote-authority'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      remoteAuthority: 'ssh-remote+开发机.example',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.remoteAuthority(0)).toHaveText('SSH: 开发机.example')
}
