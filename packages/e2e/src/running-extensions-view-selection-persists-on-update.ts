import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-persists-on-update'

const waitForCondition = async (condition: () => Promise<void>): Promise<void> => {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      await condition()
      return
    } catch {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    }
  }
  await condition()
}

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
  const selectedName = selectedRow.locator('.RunningExtensionName')
  await waitForCondition(() => expect(selectedName).toHaveText('Second'))

  const updatedExtensions = extensions.map((extension: Readonly<(typeof extensions)[number]>) => ({
    ...extension,
    name: `Updated ${extension.name}`,
    version: '2.0.0',
  }))
  await Command.execute('RunningExtensions.setExtensions', updatedExtensions)

  await expect(selectedRow).toHaveCount(1)
  await waitForCondition(() => expect(selectedName).toHaveText('Updated Second'))
  const selectedVersion = selectedRow.locator('.RunningExtensionVersion')
  await expect(selectedVersion).toHaveText('2.0.0')
}
