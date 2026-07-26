import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-context-menu-focus-outline'

export const skip = ['webkit'] as const

const waitForRender = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
}

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Locator, RunningExtensions }: TestApi) => {
  await ClipBoard.enableMemoryClipBoard()
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'first.extension',
      name: 'First',
      version: '1.0.0',
    },
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'second.extension',
      name: 'Second',
      version: '1.0.0',
    },
  ])

  const outlinedRows = Locator('.RunningExtension.FocusOutline')

  // eslint-disable-next-line e2e/no-direct-click -- verifies delegated context menu handling
  await RunningExtensions.row(1).click({ button: 'right' })
  await expect(outlinedRows).toHaveCount(1)
  await ContextMenu.selectItem('Copy id (second.extension)')
  await RunningExtensions.select(0)
  await waitForRender()
  await expect(outlinedRows).toHaveCount(0)

  // eslint-disable-next-line e2e/no-direct-click -- verifies delegated context menu handling
  await RunningExtensions.row(1).click({ button: 'right' })
  await expect(outlinedRows).toHaveCount(1)
  await ContextMenu.selectItem('Copy id (second.extension)')
  await Command.execute('RunningExtensions.handleClickAt', 10_000)
  await expect(outlinedRows).toHaveCount(0)

  // eslint-disable-next-line e2e/no-direct-click -- verifies delegated context menu handling
  await RunningExtensions.row(1).click({ button: 'right' })
  await expect(outlinedRows).toHaveCount(1)
  await ContextMenu.selectItem('Copy id (second.extension)')
  await Command.execute('RunningExtensions.handleBlur')
  await expect(outlinedRows).toHaveCount(0)
}
