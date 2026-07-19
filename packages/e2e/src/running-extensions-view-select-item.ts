import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-select-item'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute(
    'RunningExtensions.setExtensions',
    [0, 1].map((index) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.extension-${index}`,
      name: `Extension ${index}`,
      version: '1.0.0',
    })),
  )

  const rows = Locator('.RunningExtension')
  const secondRow = rows.nth(1)
  const firstSelectedRow = Locator('.RunningExtension.ExtensionActive[data-index="0"]')
  const secondSelectedRow = Locator('.RunningExtension.ExtensionActive[data-index="1"]')

  // eslint-disable-next-line e2e/no-direct-click -- verifies delegated row click selection
  await secondRow.click()

  await expect(firstSelectedRow).toHaveCount(0)
  await expect(secondSelectedRow).toHaveCount(1)
}
