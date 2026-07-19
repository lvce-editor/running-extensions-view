import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-persists-on-update'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  const extensions = ['First', 'Second'].map((name, index) => ({
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: `sample.extension-${index}`,
    name,
    version: '1.0.0',
  }))
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', extensions)

  const secondRow = Locator('.RunningExtension').nth(1)
  const selectedRow = Locator('.RunningExtension.ExtensionActive')
  // eslint-disable-next-line e2e/no-direct-click -- verifies selection state across a data refresh
  await secondRow.click()
  await expect(selectedRow).toHaveAttribute('data-index', '1')

  const updatedExtensions = extensions.map((extension: Readonly<(typeof extensions)[number]>) => ({
    ...extension,
    name: `Updated ${extension.name}`,
    version: '2.0.0',
  }))
  await Command.execute('RunningExtensions.setExtensions', updatedExtensions)

  await expect(selectedRow).toHaveCount(1)
  await expect(selectedRow).toHaveAttribute('data-index', '1')
  await expect(selectedRow.locator('.RunningExtensionName')).toHaveText('Updated Second')
  await expect(selectedRow.locator('.RunningExtensionVersion')).toHaveText('2.0.0')
}
