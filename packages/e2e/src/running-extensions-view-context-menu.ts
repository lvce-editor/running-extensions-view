import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-context-menu'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, Main }) => {
  await Main.openUri('running-extensions:///1')
  const firstExtension = Locator('.RunningExtension').first()
  await expect(firstExtension).toBeVisible()

  await Command.execute('RunningExtensions.handleContextMenu', 0, 0, 0)

  const menuItems = Locator('.Menu').locator('.MenuItem')
  await expect(menuItems).toHaveCount(7)
  const copyId = menuItems.nth(0)
  const reportIssue = menuItems.nth(1)
  const disableWorkspace = menuItems.nth(3)
  const disable = menuItems.nth(4)
  const startProfile = menuItems.nth(6)
  await expect(copyId).toContainText('Copy id (')
  await expect(reportIssue).toHaveText('Report Issue')
  await expect(disableWorkspace).toHaveText('Disable (Workspace)')
  await expect(disable).toHaveText('Disable')
  await expect(startProfile).toHaveText('Start Extension Host Profile')
}
