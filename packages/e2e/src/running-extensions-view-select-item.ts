import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-select-item'

const waitForRender = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
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
  await waitForRender()

  await expect(RunningExtensions.selectedRow(0)).toHaveCount(0)
  await expect(RunningExtensions.selectedRow(1)).toHaveCount(1)
}
