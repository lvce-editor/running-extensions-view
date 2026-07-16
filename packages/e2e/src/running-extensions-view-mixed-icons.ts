import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-mixed-icons'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '/icons/custom.svg',
      id: 'custom.extension',
      name: 'Custom Icon',
      version: '1.0.0',
    },
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'default.extension',
      name: 'Default Icon',
      version: '1.0.0',
    },
  ])

  const customIcons = Locator('img.RunningExtensionIcon')
  const defaultIcons = Locator('.RunningExtensionDefaultIcon')
  const firstIcon = Locator('.RunningExtensionIcon[data-index="0"]')
  const secondIcon = Locator('.RunningExtensionDefaultIcon[data-index="1"]')
  await expect(customIcons).toHaveCount(1)
  await expect(defaultIcons).toHaveCount(1)
  await expect(firstIcon).toHaveAttribute('src', '/icons/custom.svg')
  await expect(secondIcon).toHaveAttribute('role', 'none')
}
