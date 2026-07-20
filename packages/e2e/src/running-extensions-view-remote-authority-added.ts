import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-remote-authority-added'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.remoteAuthority(0)).toHaveCount(0)

  await RunningExtensions.setExtensions([{ ...extension, remoteAuthority: 'ssh-remote+dev.example.com' }])

  await expect(RunningExtensions.remoteAuthority(0)).toHaveText('SSH: dev.example.com')
  await expect(RunningExtensions.name(0)).toHaveText('Sample Extension')
}
