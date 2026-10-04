import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-cleared-when-empty'

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

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon: '', id: 'sample.extension', name: 'Sample Extension', version: '1.0.0' },
  ])
  await RunningExtensions.select(0)
  const selectedName = RunningExtensions.root().locator('.RunningExtension.ExtensionActive .RunningExtensionName')
  await waitForCondition(() => expect(selectedName).toHaveText('Sample Extension'))

  await RunningExtensions.setExtensions([])

  await expect(RunningExtensions.rows()).toHaveCount(0)
  const activeRow = RunningExtensions.root().locator('.ExtensionActive')
  await waitForCondition(() => expect(activeRow).toHaveCount(0))
  await expect(RunningExtensions.emptyMessage()).toHaveText('No running extensions')
}
