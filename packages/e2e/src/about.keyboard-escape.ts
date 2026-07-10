import type { Test, TestApi } from '@lvce-editor/test-with-playwright'
import { openAbout } from './_about.js'

type Expect = TestApi['expect']
type Locator = ReturnType<TestApi['Locator']>

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    const setTimeout = (globalThis as any).setTimeout
    setTimeout(resolve, ms)
  })
}

const pressEscapeUntilHidden = async (KeyBoard: TestApi['KeyBoard'], expect: Expect, locator: Locator): Promise<void> => {
  let lastError: unknown
  for (let i = 0; i < 20; i++) {
    await KeyBoard.press('Escape')
    try {
      await expect(locator).toBeHidden()
      return
    } catch (error) {
      lastError = error
      await wait(50)
    }
  }
  throw lastError
}

export const name = 'about.keyboard-escape'

export const test: Test = async ({ About, expect, KeyBoard, Locator }) => {
  const aboutApi = { About, expect, Locator }
  const dialogContent = await openAbout(aboutApi)

  await pressEscapeUntilHidden(KeyBoard, expect, dialogContent)
}
