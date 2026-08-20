import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-long-metadata'

export const test: Test = async ({ expect, RunningExtensions }: TestApi) => {
  const activationEvent = `onCommand:${'activate.'.repeat(30)}run`
  const id = `${'publisher.'.repeat(20)}extension`
  const extensionName = `${'Long Extension Name '.repeat(20)}End`
  const version = `1.0.0+${'build.'.repeat(20)}final`
  await RunningExtensions.show()
  await RunningExtensions.setExtensions([
    {
      activationEvent,
      activationTime: 1,
      icon: '',
      id,
      name: extensionName,
      version,
    },
  ])

  await expect(RunningExtensions.name(0)).toHaveText(extensionName)
  await expect(RunningExtensions.id(0)).toHaveText(id)
  await expect(RunningExtensions.version(0)).toHaveText(version)
  await expect(RunningExtensions.activationReason(0)).toHaveText(`Activation reason: ${activationEvent}`)
}
