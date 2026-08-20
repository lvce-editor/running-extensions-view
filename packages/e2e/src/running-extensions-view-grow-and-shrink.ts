import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-grow-and-shrink'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const first = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'first.extension',
    name: 'First',
    version: '1.0.0',
  }
  const second = { ...first, id: 'second.extension', name: 'Second' }
  const third = { ...first, id: 'third.extension', name: 'Third' }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([first])

  await expect(RunningExtensions.rows()).toHaveCount(1)
  await RunningExtensions.setExtensions([first, second, third])
  await expect(RunningExtensions.rows()).toHaveCount(3)
  await RunningExtensions.setExtensions([third])
  await expect(RunningExtensions.rows()).toHaveCount(1)
  await expect(RunningExtensions.name(0)).toHaveText('Third')
}
