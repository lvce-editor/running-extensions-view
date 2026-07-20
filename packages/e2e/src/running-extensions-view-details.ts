import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-details'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 12.6,
      icon: '/icons/sample.svg',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.2.3',
    },
    {
      activationEvent: 'onCommand:another.run',
      activationTime: 4.2,
      icon: '',
      id: 'another.extension',
      name: 'Another Extension',
      version: '2.0.0',
    },
  ])

  await expect(RunningExtensions.rows()).toHaveCount(2)
  await expect(RunningExtensions.row(0)).toHaveAttribute('role', 'listitem')
  await expect(RunningExtensions.name(0)).toHaveText('Sample Extension')
  await expect(RunningExtensions.version(0)).toHaveText('1.2.3')
  await expect(RunningExtensions.id(0)).toHaveText('sample.extension')
  await expect(RunningExtensions.activationTime(0)).toHaveText('Activation: 13ms')
  await expect(RunningExtensions.activationReason(0)).toHaveText('Activation reason: onStartupFinished')
  await expect(RunningExtensions.icon(0)).toHaveAttribute('src', '/icons/sample.svg')
  await expect(RunningExtensions.row(1)).toHaveAttribute('role', 'listitem')
  await expect(RunningExtensions.name(1)).toHaveText('Another Extension')
  await expect(RunningExtensions.activationTime(1)).toHaveText('Activation: 4ms')
  await expect(RunningExtensions.activationReason(1)).toHaveText('Activation reason: onCommand:another.run')
}
