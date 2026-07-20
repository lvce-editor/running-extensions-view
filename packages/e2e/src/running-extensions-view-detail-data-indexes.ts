import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-detail-data-indexes'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' },
    { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' },
    { activationEvent: 'onCommand:third.run', activationTime: 3, icon: '', id: 'third.extension', name: 'Third', version: '3.0.0' },
  ])

  await expect(RunningExtensions.name(2)).toHaveAttribute('data-index', '2')
  await expect(RunningExtensions.version(2)).toHaveAttribute('data-index', '2')
  await expect(RunningExtensions.id(2)).toHaveAttribute('data-index', '2')
  await expect(RunningExtensions.activationTime(2)).toHaveAttribute('data-index', '2')
  await expect(RunningExtensions.activationReason(2)).toHaveAttribute('data-index', '2')
  await expect(RunningExtensions.defaultIcon(2)).toHaveAttribute('data-index', '2')
}
