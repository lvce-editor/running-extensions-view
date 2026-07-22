import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-moves'

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

  const rows = Locator('.RunningExtension')
  const firstRow = rows.nth(0)
  const secondRow = rows.nth(1)
  const selectedRow = Locator('.RunningExtension.ExtensionActive')
  // eslint-disable-next-line e2e/no-direct-click -- verifies selection transitions between rows
  await secondRow.click()
  await waitForRender()
  await expect(selectedRow).toHaveAttribute('data-index', '1')

  // eslint-disable-next-line e2e/no-direct-click -- verifies selection transitions between rows
  await firstRow.click()
  await waitForRender()
  await expect(selectedRow).toHaveCount(1)
  await expect(selectedRow).toHaveAttribute('data-index', '0')
}
