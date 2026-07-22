import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-populated-empty-populated'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const first = { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' }
  const second = { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([first])
  await expect(RunningExtensions.name(0)).toHaveText('First')

  await RunningExtensions.setExtensions([])
  await expect(RunningExtensions.rows()).toHaveCount(0)
  await expect(RunningExtensions.emptyMessage()).toHaveText('No running extensions')

  await RunningExtensions.setExtensions([second])

  await expect(RunningExtensions.emptyMessage()).toHaveCount(0)
  await expect(RunningExtensions.rows()).toHaveCount(1)
  await expect(RunningExtensions.name(0)).toHaveText('Second')
  await expect(RunningExtensions.id(0)).toHaveText('second.extension')
}
