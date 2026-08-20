import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-thousand-extensions'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const extensions = Array.from({ length: 1000 }, (_, index) => ({
    activationEvent: 'onStartupFinished',
    activationTime: index,
    icon: '',
    id: `sample.extension-${index}`,
    name: `Extension ${index}`,
    version: `1.0.${index}`,
  }))
  await RunningExtensions.show()
  await RunningExtensions.setExtensions(extensions)

  await expect(RunningExtensions.rows()).toHaveCount(1000)
  await expect(RunningExtensions.row(0)).toBeVisible()
  await expect(RunningExtensions.root()).toHaveJSProperty('scrollTop', 0)

  await RunningExtensions.row(999).hover()

  await expect(RunningExtensions.root()).not.toHaveJSProperty('scrollTop', 0)
  await expect(RunningExtensions.row(999)).toBeVisible()
  await expect(RunningExtensions.name(999)).toHaveText('Extension 999')
  await expect(RunningExtensions.version(999)).toHaveText('1.0.999')
}
