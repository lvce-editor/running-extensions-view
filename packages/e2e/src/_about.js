// @ts-check

/**
 * @typedef {import('@lvce-editor/test-with-playwright').TestApi} TestApi
 * @typedef {ReturnType<TestApi['Locator']>} Locator
 * @typedef {Pick<TestApi, 'About' | 'expect' | 'Locator'>} AboutTestApi
 */

/**
 * @param {Pick<TestApi, 'Locator'>} api
 * @returns {Locator}
 */
export const getDialogContent = ({ Locator }) => {
  return Locator('.DialogContent')
}

/**
 * @param {Locator} dialogContent
 * @returns {Locator}
 */
export const getCloseButton = (dialogContent) => {
  return dialogContent.locator('.DialogClose')
}

/**
 * @param {Locator} dialogContent
 * @returns {Locator}
 */
export const getInfoIcon = (dialogContent) => {
  return dialogContent.locator('.DialogInfoIcon')
}

/**
 * @param {Locator} dialogContent
 * @returns {Locator}
 */
export const getHeading = (dialogContent) => {
  return dialogContent.locator('.DialogHeading')
}

/**
 * @param {Locator} dialogContent
 * @returns {Locator}
 */
export const getMessage = (dialogContent) => {
  return dialogContent.locator('.DialogMessage')
}

/**
 * @param {Locator} dialogContent
 * @returns {Locator}
 */
export const getOkButton = (dialogContent) => {
  return dialogContent.locator('.ButtonSecondary')
}

/**
 * @param {Locator} dialogContent
 * @returns {Locator}
 */
export const getCopyButton = (dialogContent) => {
  return dialogContent.locator('.ButtonPrimary')
}

/**
 * @param {AboutTestApi} api
 * @param {Locator} dialogContent
 */
export const assertAboutDialogVisible = async (api, dialogContent) => {
  const { expect } = api
  await expect(dialogContent).toBeVisible()
  await expect(dialogContent).toHaveAttribute('role', 'dialog')
  await expect(dialogContent).toHaveAttribute('aria-modal', 'true')
  await expect(dialogContent).toHaveAttribute('aria-labelledby', 'DialogIcon DialogHeading')
  await expect(getInfoIcon(dialogContent)).toBeVisible()
}

/**
 * @param {AboutTestApi} api
 * @param {Locator} dialogContent
 */
export const assertAboutContent = async (api, dialogContent) => {
  const { expect } = api
  const message = getMessage(dialogContent)
  await expect(getHeading(dialogContent)).toHaveText('Lvce Editor - OSS')
  await expect(message).toContainText('Version: 0.0.0-dev')
  await expect(message).toContainText('Commit: unknown commit')
  await expect(message).toContainText('Date: unknown')
  await expect(message).toContainText('Browser: ')
  await expect(getOkButton(dialogContent)).toHaveText('Ok')
  await expect(getOkButton(dialogContent)).toHaveAttribute('name', 'Ok')
  await expect(getCopyButton(dialogContent)).toHaveText('Copy')
  await expect(getCopyButton(dialogContent)).toHaveAttribute('name', 'Copy')
}

/**
 * @param {AboutTestApi} api
 * @returns {Promise<Locator>}
 */
export const openAbout = async (api) => {
  await api.About.show()
  const dialogContent = getDialogContent(api)
  await assertAboutDialogVisible(api, dialogContent)
  return dialogContent
}

/**
 * @param {AboutTestApi} api
 */
export const closeAbout = async (api) => {
  const dialogContent = getDialogContent(api)
  await api.About.handleClickClose()
  await api.expect(dialogContent).toBeHidden()
}
