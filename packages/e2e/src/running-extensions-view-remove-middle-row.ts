import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-remove-middle-row'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const first = { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' }
  const second = { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' }
  const third = { activationEvent: '', activationTime: 3, icon: '', id: 'third.extension', name: 'Third', version: '3.0.0' }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([first, second, third])
  await expect(RunningExtensions.rows()).toHaveCount(3)

  await RunningExtensions.setExtensions([first, third])

  await expect(RunningExtensions.rows()).toHaveCount(2)
  await expect(RunningExtensions.name(0)).toHaveText('First')
  await expect(RunningExtensions.name(1)).toHaveText('Third')
  await expect(RunningExtensions.id(1)).toHaveText('third.extension')
  await expect(RunningExtensions.row(1)).toHaveAttribute('data-index', '1')
}
