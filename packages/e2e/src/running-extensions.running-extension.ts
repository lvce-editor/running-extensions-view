import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions.running-extension'

export const test: Test = async ({ expect, Extension, Locator, Main, QuickPick }) => {
  const extensionUri = import.meta.resolve('../fixtures/sample.running-extension')
  await Extension.addWebExtension(extensionUri)
  await QuickPick.executeCommand('Activate Sample Extension')

  await Main.openUri('running-extensions:///running')

  const extension = Locator('.RunningExtension', { hasText: 'sample.running-extension' })
  await expect(extension).toBeVisible()
  await expect(extension).toHaveAttribute('role', 'listitem')
  await expect(extension.locator('.RunningExtensionName')).toHaveText('Sample Running Extension')
  await expect(extension.locator('.RunningExtensionVersion')).toHaveText('1.2.3')
  await expect(extension.locator('.RunningExtensionActivationTime')).toContainText('Activation: ')
  await expect(extension.locator('.RunningExtensionDefaultIcon')).toBeVisible()
}
