import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-second-row-context-menu'

export const skip = ['webkit'] as const

export const test: Test = async ({ expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'first.extension',
      name: 'First',
      version: '1.0.0',
    },
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'second.extension',
      name: 'Second',
      version: '1.0.0',
    },
  ])

  await RunningExtensions.handleContextMenu(1)

  const menuEntries = Locator('.Menu > [role]')
  const copyId = menuEntries.first()
  await expect(copyId).toHaveText('Copy id (second.extension)')
}
