import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-select-nested-content'

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
  await expect(selectedName).toHaveText('Second')
}
