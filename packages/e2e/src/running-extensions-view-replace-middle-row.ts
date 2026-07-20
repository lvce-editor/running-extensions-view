import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-replace-middle-row'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const first = { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' }
  const oldMiddle = { activationEvent: '', activationTime: 2, icon: '', id: 'old.extension', name: 'Old Middle', version: '2.0.0' }
  const newMiddle = { activationEvent: '', activationTime: 4, icon: '', id: 'new.extension', name: 'New Middle', version: '4.0.0' }
  const third = { activationEvent: '', activationTime: 3, icon: '', id: 'third.extension', name: 'Third', version: '3.0.0' }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([first, oldMiddle, third])
  await expect(RunningExtensions.name(1)).toHaveText('Old Middle')

  await RunningExtensions.setExtensions([first, newMiddle, third])

  await expect(RunningExtensions.rows()).toHaveCount(3)
  await expect(RunningExtensions.name(0)).toHaveText('First')
  await expect(RunningExtensions.name(1)).toHaveText('New Middle')
  await expect(RunningExtensions.id(1)).toHaveText('new.extension')
  await expect(RunningExtensions.name(2)).toHaveText('Third')
}
