import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-select-nested-content'

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
  await RunningExtensions.show()
  await Command.execute(
    'RunningExtensions.setExtensions',
    ['First', 'Second'].map((name, index) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.extension-${index}`,
      name,
      version: '1.0.0',
    })),
  )

  const secondName = Locator('.RunningExtensionName').nth(1)
  // eslint-disable-next-line e2e/no-direct-click -- verifies delegated selection from nested row content
  await secondName.click()

  const selectedRow = Locator('.RunningExtension.ExtensionActive')
  const selectedName = selectedRow.locator('.RunningExtensionName')
  await waitForCondition(() => expect(selectedName).toHaveText('Second'))
}
