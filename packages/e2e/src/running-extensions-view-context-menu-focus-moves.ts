import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-context-menu-focus-moves'

export const skip = ['webkit'] as const

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute(
    'RunningExtensions.setExtensions',
    ['First', 'Second'].map((name, index) => ({
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: `sample.extension-${index}`,
      name,
      version: '1.0.0',
    })),
  )

  const rows = Locator('.RunningExtension')
  const firstRow = rows.nth(0)
  const secondRow = rows.nth(1)
  await RunningExtensions.handleContextMenu(1)
  await expect(secondRow).toHaveClass('FocusOutline')

  await RunningExtensions.handleContextMenu(0)
  await expect(firstRow).toHaveClass('FocusOutline')
  await expect(secondRow).not.toHaveClass('FocusOutline')
}
