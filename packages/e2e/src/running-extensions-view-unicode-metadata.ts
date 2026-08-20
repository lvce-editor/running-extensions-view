import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-unicode-metadata'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: '出版者.扩展',
      name: '扩展工具 🚀',
      version: '版本-α',
    },
  ])

  await expect(RunningExtensions.name(0)).toHaveText('扩展工具 🚀')
  await expect(RunningExtensions.id(0)).toHaveText('出版者.扩展')
  await expect(RunningExtensions.version(0)).toHaveText('版本-α')
}
