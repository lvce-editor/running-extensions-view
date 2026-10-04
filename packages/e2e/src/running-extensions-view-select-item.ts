import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-select-item'

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
  await RunningExtensions.setExtensions(
    [0, 1].map((index) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.extension-${index}`,
      name: `Extension ${index}`,
      version: '1.0.0',
    })),
  )

  await RunningExtensions.select(1)

  const selectedName = RunningExtensions.root().locator('.RunningExtension.ExtensionActive .RunningExtensionName')
  await waitForCondition(() => expect(selectedName).toHaveText('Extension 1'))
}
