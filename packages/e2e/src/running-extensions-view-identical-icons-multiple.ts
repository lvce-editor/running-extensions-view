import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-identical-icons-multiple'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const icon = '/icons/shared.svg'
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    { activationEvent: '', activationTime: 1, icon, id: 'first.extension', name: 'First', version: '1.0.0' },
    { activationEvent: '', activationTime: 2, icon, id: 'second.extension', name: 'Second', version: '2.0.0' },
  ])

  await expect(RunningExtensions.root().locator('img.RunningExtensionIcon')).toHaveCount(2)
  await expect(RunningExtensions.icon(0)).toHaveAttribute('src', icon)
  await expect(RunningExtensions.icon(1)).toHaveAttribute('src', icon)
}
