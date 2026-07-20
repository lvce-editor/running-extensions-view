import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-context-menu'

export const skip = ['webkit'] as const

export const test: Test = async ({ expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onCommand:test.running-extension',
      activationTime: 1,
      icon: '',
      id: 'test.running-extension',
      isolated: true,
      name: 'Running Extension',
      version: '1.0.0',
    },
  ])

  await expect(RunningExtensions.row(0)).toBeVisible()

  await RunningExtensions.handleContextMenu(0)

  const menuEntries = Locator('.Menu > [role]')
  await expect(menuEntries).toHaveCount(7)
  const copyId = menuEntries.nth(0)
  const reportIssue = menuEntries.nth(1)
  const firstSeparator = menuEntries.nth(2)
  const disableWorkspace = menuEntries.nth(3)
  const disable = menuEntries.nth(4)
  const secondSeparator = menuEntries.nth(5)
  const startProfile = menuEntries.nth(6)
  await expect(copyId).toHaveText('Copy id (test.running-extension)')
  await expect(reportIssue).toHaveText('Report Issue')
  await expect(firstSeparator).toHaveAttribute('role', 'separator')
  await expect(disableWorkspace).toHaveText('Disable (Workspace)')
  await expect(disable).toHaveText('Disable')
  await expect(secondSeparator).toHaveAttribute('role', 'separator')
  await expect(startProfile).toHaveText('Start Extension Host Profile')
}
