import type { Test } from '@lvce-editor/test-with-playwright'
import { closeAbout, openAbout } from './_about.js'

export const name = 'about.keyboard-tab'

export const test: Test = async ({ About, expect, KeyBoard, Locator }) => {
  const aboutApi = { About, expect, Locator }
  const dialogContent = await openAbout(aboutApi)

  try {
    await KeyBoard.press('Tab')
    await expect(dialogContent).toBeVisible()
  } finally {
    await closeAbout(aboutApi)
  }
}
