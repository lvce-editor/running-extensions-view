import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-cleared-by-outside-click'

const waitForRender = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
}

export const test: Test = async ({ Command, expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' },
    { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' },
  ])
  await RunningExtensions.select(1)
  await waitForRender()
  await expect(RunningExtensions.selectedRow(1)).toHaveCount(1)

  await Command.execute('RunningExtensions.handleClickAt', 10_000)

  await expect(RunningExtensions.root().locator('.ExtensionActive')).toHaveCount(0)
  await expect(RunningExtensions.rows()).toHaveCount(2)
}
