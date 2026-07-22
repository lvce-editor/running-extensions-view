import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-select-nested-content'

const waitForRender = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
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

  const secondName = Locator('.RunningExtension[data-index="1"] .RunningExtensionName')
  // eslint-disable-next-line e2e/no-direct-click -- verifies delegated selection from nested row content
  await secondName.click()
  await waitForRender()

  const selectedRow = Locator('.RunningExtension.ExtensionActive')
  await expect(selectedRow).toHaveAttribute('data-index', '1')
  await expect(selectedRow.locator('.RunningExtensionName')).toHaveText('Second')
}
