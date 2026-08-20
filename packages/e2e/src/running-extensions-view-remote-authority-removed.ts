import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-remote-authority-removed'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    remoteAuthority: 'ssh-remote+dev.example.com',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.remoteAuthority(0)).toHaveText('SSH: dev.example.com')

  await RunningExtensions.setExtensions([{ ...extension, remoteAuthority: '' }])

  await expect(RunningExtensions.remoteAuthority(0)).toHaveCount(0)
  await expect(RunningExtensions.id(0)).toHaveText('sample.extension')
}
