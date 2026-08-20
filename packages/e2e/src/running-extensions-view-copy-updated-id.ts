import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-copy-updated-id'

export const test: Test = async ({ ClipBoard, RunningExtensions }: TestApi) => {
  const extension = {
    activationEvent: '',
    activationTime: 1,
    icon: '',
    id: 'old.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  await ClipBoard.enableMemoryClipBoard()
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([extension])

  await RunningExtensions.setExtensions([{ ...extension, id: 'new.extension' }])
  await RunningExtensions.copyId(0)

  await ClipBoard.shouldHaveText('new.extension')
}
