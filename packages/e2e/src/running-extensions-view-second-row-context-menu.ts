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

  // eslint-disable-next-line e2e/no-direct-click -- verifies delegated context menu handling for the second row
  await RunningExtensions.row(1).click({ button: 'right' })

  const menuEntries = Locator('.Menu > [role]')
  const copyId = menuEntries.first()
  await expect(copyId).toHaveText('Copy id (second.extension)')
}
