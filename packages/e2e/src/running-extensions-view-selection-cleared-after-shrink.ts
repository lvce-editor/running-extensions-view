import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-selection-cleared-after-shrink'

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
  const first = { activationEvent: '', activationTime: 1, icon: '', id: 'first.extension', name: 'First', version: '1.0.0' }
  const second = { activationEvent: '', activationTime: 2, icon: '', id: 'second.extension', name: 'Second', version: '2.0.0' }
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([first, second])
  await RunningExtensions.select(1)
  const selectedName = RunningExtensions.root().locator('.RunningExtension.ExtensionActive .RunningExtensionName')
  await waitForCondition(() => expect(selectedName).toHaveText('Second'))

  await RunningExtensions.setExtensions([first])

  await expect(RunningExtensions.rows()).toHaveCount(1)
  const activeRow = RunningExtensions.root().locator('.ExtensionActive')
  await waitForCondition(() => expect(activeRow).toHaveCount(0))
  await expect(RunningExtensions.name(0)).toHaveText('First')
}
