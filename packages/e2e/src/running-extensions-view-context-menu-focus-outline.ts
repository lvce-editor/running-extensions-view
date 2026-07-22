import type { Test, TestApi } from '@lvce-editor/test-with-playwright'
import { waitForRender } from './_wait-for-render.ts'

export const name = 'running-extensions-view-context-menu-focus-outline'

export const skip = ['webkit'] as const

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

  await RunningExtensions.handleContextMenu(1)
  await expect(outlinedRows).toHaveCount(1)
  await ContextMenu.selectItem('Copy id (second.extension)')
  await RunningExtensions.select(0)
  await waitForRender()
  await expect(outlinedRows).toHaveCount(0)

  await RunningExtensions.handleContextMenu(1)
  await expect(outlinedRows).toHaveCount(1)
  await ContextMenu.selectItem('Copy id (second.extension)')
  await Command.execute('RunningExtensions.handleClickAt', 10_000)
  await expect(outlinedRows).toHaveCount(0)

  await RunningExtensions.handleContextMenu(1)
  await expect(outlinedRows).toHaveCount(1)
  await ContextMenu.selectItem('Copy id (second.extension)')
  await Command.execute('RunningExtensions.handleBlur')
  await expect(outlinedRows).toHaveCount(0)
}
