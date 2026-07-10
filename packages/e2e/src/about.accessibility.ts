import type { Test } from '@lvce-editor/test-with-playwright'
import { closeAbout, getCloseButton, getHeading, getInfoIcon, openAbout } from './_about.js'

export const name = 'about.accessibility'

export const test: Test = async ({ About, expect, Locator }) => {
  const aboutApi = { About, expect, Locator }
  const dialogContent = await openAbout(aboutApi)

  try {
    await expect(getHeading(dialogContent)).toHaveId('DialogHeading')
    await expect(getInfoIcon(dialogContent)).toHaveId('DialogIcon')
    await expect(getInfoIcon(dialogContent)).toHaveAttribute('aria-label', 'Info')
    await expect(getCloseButton(dialogContent)).toHaveAttribute('aria-label', 'Close Dialog')
    await expect(getCloseButton(dialogContent)).toHaveAttribute('role', 'button')
  } finally {
    await closeAbout(aboutApi)
  }
}
