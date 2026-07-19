import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-mixed-icons'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
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

  await expect(RunningExtensions.icon(0)).toHaveAttribute('src', '/icons/custom.svg')
  await expect(RunningExtensions.defaultIcon(1)).toHaveAttribute('role', 'none')
}
