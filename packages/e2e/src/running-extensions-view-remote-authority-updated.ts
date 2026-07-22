import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-remote-authority-updated'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: '',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    remoteAuthority: 'ssh-remote+first.example.com',
    version: '1.0.0',
  }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])
  await expect(RunningExtensions.remoteAuthority(0)).toHaveText('SSH: first.example.com')

  await RunningExtensions.setExtensions([{ ...extension, remoteAuthority: 'ssh-remote+second.example.com' }])

  await expect(RunningExtensions.remoteAuthority(0)).toHaveCount(1)
  await expect(RunningExtensions.remoteAuthority(0)).toHaveText('SSH: second.example.com')
  await expect(RunningExtensions.remoteAuthority(0)).toHaveAttribute('data-index', '0')
}
