import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-append-row'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const first = { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' }
  const second = { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([first])
  await expect(RunningExtensions.rows()).toHaveCount(1)

  await RunningExtensions.setExtensions([first, second])

  await expect(RunningExtensions.rows()).toHaveCount(2)
  await expect(RunningExtensions.name(0)).toHaveText('First')
  await expect(RunningExtensions.name(1)).toHaveText('Second')
  await expect(RunningExtensions.row(1)).toHaveAttribute('data-index', '1')
}
