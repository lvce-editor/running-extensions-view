import type { Test } from '@lvce-editor/test-with-playwright'
import { openAbout } from './_about.js'

export const name = 'about.click-copy'

export const test: Test = async ({ About, ClipBoard, expect, Locator }) => {
  const aboutApi = { About, expect, Locator }

  // arrange
  const dialogContent = await openAbout(aboutApi)
  await ClipBoard.enableMemoryClipBoard()

  try {
    // act
    await About.handleClickCopy()

    // assert
    await ClipBoard.shouldHaveText(/Version: 0\.0\.0-dev\nCommit: unknown commit\nDate: unknown\nBrowser: /)
    await expect(dialogContent).toBeHidden()
  } finally {
    await ClipBoard.disableMemoryClipBoard()
  }
}
