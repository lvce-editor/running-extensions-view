import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetAboutDetailString from '../src/parts/GetAboutDetailString/GetAboutDetailString.ts'

test('getDetailStringWeb', async () => {
  RendererWorker.registerMockRpc({
    'Process.getChromeVersion'(): string {
      return '0.0.0-dev'
    },
    'Process.getElectronVersion'(): string {
      return '0.0.0-dev'
    },
    'Process.getNodeVersion'(): string {
      return '0.0.0-dev'
    },
    'Process.getV8Version'(): string {
      return '0.0.0-dev'
    },
  })
  expect(await GetAboutDetailString.getDetailString()).toBe(
    `Version: 0.0.0-dev\nCommit: unknown commit\nDate: unknown\nElectron: 0.0.0-dev\nChromium: 0.0.0-dev\nNode: 0.0.0-dev\nV8: 0.0.0-dev`,
  )
})
