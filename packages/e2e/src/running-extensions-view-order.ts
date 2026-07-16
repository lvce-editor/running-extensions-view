import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-order'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute(
    'RunningExtensions.setExtensions',
    ['First', 'Second', 'Third'].map((name) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.${name.toLowerCase()}`,
      name,
      version: '1.0.0',
    })),
  )

  const names = Locator('.RunningExtensionName')
  const firstName = names.nth(0)
  const secondName = names.nth(1)
  const thirdName = names.nth(2)
  await expect(firstName).toHaveText('First')
  await expect(secondName).toHaveText('Second')
  await expect(thirdName).toHaveText('Third')
}
