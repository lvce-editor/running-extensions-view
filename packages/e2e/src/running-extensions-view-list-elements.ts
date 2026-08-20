import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-list-elements'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' },
    { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' },
    { activationEvent: '', activationTime: 3, icon: '', id: 'third.extension', name: 'Third', version: '3.0.0' },
  ])

  await expect(RunningExtensions.root()).toHaveJSProperty('tagName', 'UL')
  await expect(RunningExtensions.row(0)).toHaveJSProperty('tagName', 'LI')
  await expect(RunningExtensions.row(1)).toHaveJSProperty('tagName', 'LI')
  await expect(RunningExtensions.row(2)).toHaveJSProperty('tagName', 'LI')
}
