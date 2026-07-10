import { expect, test } from '@jest/globals'
import { FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetAboutDetailString from '../src/parts/GetAboutDetailString/GetAboutDetailString.ts'
import * as ShowAboutElectron from '../src/parts/ShowAboutElectron/ShowAboutElectron.ts'

// Ok button

test('showAboutElectron - clicks ok button', async () => {
  using mockFileRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile'(uri: string): string {
      expect(uri).toBe('config.json')
      return JSON.stringify({
        productName: 'Configured Editor',
      })
    },
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText'(_text: string): void {},
    'ElectronDialog.showMessageBox'(options: any): number {
      return 1
    },
    'GetAboutDetailString.getDetailString'(): Promise<string> | string {
      return GetAboutDetailString.getDetailString()
    },
    'GetWindowId.getWindowId'(): number {
      return 1
    },
    'PlatformPaths.getConfigJsonPath'(): string {
      return 'config.json'
    },
    'Process.getChromeVersion'(): string {
      return 'x'
    },
    'Process.getCommit'(): string {
      return 'unknown commit'
    },
    'Process.getDate'(): string {
      return 'unknown'
    },
    'Process.getElectronVersion'(): string {
      return 'x'
    },
    'Process.getNodeVersion'(): string {
      return 'x'
    },
    'Process.getV8Version'(): string {
      return 'x'
    },
    'Process.getVersion'(): string {
      return '0.0.0-dev'
    },
  })

  const detail = await GetAboutDetailString.getDetailString()

  await ShowAboutElectron.showAboutElectron()

  const expectedOptions = {
    buttons: ['Copy', 'Ok'],
    detail,
    message: 'Configured Editor',
    productName: 'Configured Editor',
    type: 'info',
    windowId: 1,
  }
  expect(mockRpc.invocations.find((x: readonly any[]) => x[0] === 'ElectronDialog.showMessageBox')).toEqual([
    'ElectronDialog.showMessageBox',
    expectedOptions,
  ])
  expect(mockFileRpc.invocations).toEqual([['FileSystem.readFile', 'config.json']])
  expect(mockRpc.invocations.some((x: readonly any[]) => x[0] === 'ClipBoard.writeText')).toBe(false)
})

// Copy button

test('showAboutElectron - clicks copy button', async () => {
  using mockFileRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile'(uri: string): string {
      expect(uri).toBe('config.json')
      return JSON.stringify({
        productName: 'Configured Editor',
      })
    },
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText'(_text: string): void {},
    'ElectronDialog.showMessageBox'(options: any): number {
      return 0
    },
    'GetAboutDetailString.getDetailString'(): Promise<string> | string {
      return GetAboutDetailString.getDetailString()
    },
    'GetWindowId.getWindowId'(): number {
      return 1
    },
    'PlatformPaths.getConfigJsonPath'(): string {
      return 'config.json'
    },
    'Process.getChromeVersion'(): string {
      return 'x'
    },
    'Process.getCommit'(): string {
      return 'unknown commit'
    },
    'Process.getDate'(): string {
      return 'unknown'
    },
    'Process.getElectronVersion'(): string {
      return 'x'
    },
    'Process.getNodeVersion'(): string {
      return 'x'
    },
    'Process.getV8Version'(): string {
      return 'x'
    },
    'Process.getVersion'(): string {
      return '0.0.0-dev'
    },
  })

  const detail = await GetAboutDetailString.getDetailString()

  await ShowAboutElectron.showAboutElectron()

  const expectedOptions = {
    buttons: ['Copy', 'Ok'],
    detail,
    message: 'Configured Editor',
    productName: 'Configured Editor',
    type: 'info',
    windowId: 1,
  }
  expect(mockRpc.invocations.find((x: readonly any[]) => x[0] === 'ElectronDialog.showMessageBox')).toEqual([
    'ElectronDialog.showMessageBox',
    expectedOptions,
  ])
  expect(mockFileRpc.invocations).toEqual([['FileSystem.readFile', 'config.json']])
  expect(mockRpc.invocations.find((x: readonly any[]) => x[0] === 'ClipBoard.writeText')).toEqual(['ClipBoard.writeText', detail])
})
