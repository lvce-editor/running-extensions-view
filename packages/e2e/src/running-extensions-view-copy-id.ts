import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-copy-id'

export const test: Test = async ({ ClipBoard, Command, RunningExtensions }: TestApi) => {
  await ClipBoard.enableMemoryClipBoard()
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
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

  await RunningExtensions.copyId(1)

  await ClipBoard.shouldHaveText('second.extension')
}
