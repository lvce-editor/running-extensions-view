import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-unicode-metadata'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: '出版者.扩展',
      name: '扩展工具 🚀',
      version: '版本-α',
    },
  ])

  const row = Locator('.RunningExtension').first()
  await expect(row.locator('.RunningExtensionName')).toHaveText('扩展工具 🚀')
  await expect(row.locator('.RunningExtensionId')).toHaveText('出版者.扩展')
  await expect(row.locator('.RunningExtensionVersion')).toHaveText('版本-α')
}
