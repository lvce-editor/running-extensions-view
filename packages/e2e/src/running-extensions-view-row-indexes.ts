import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-row-indexes'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions(
    [0, 1, 2].map((index) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.extension-${index}`,
      name: `Extension ${index}`,
      version: '1.0.0',
    })),
  )

  await expect(RunningExtensions.row(0)).toHaveAttribute('data-index', '0')
  await expect(RunningExtensions.row(1)).toHaveAttribute('data-index', '1')
  await expect(RunningExtensions.row(2)).toHaveAttribute('data-index', '2')
}
