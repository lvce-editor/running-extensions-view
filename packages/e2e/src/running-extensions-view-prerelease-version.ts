import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'running-extensions-view-prerelease-version'

export const test: Test = async ({ Command, expect, Locator, RunningExtensions }: TestApi) => {
  await RunningExtensions.show()
  await Command.execute('RunningExtensions.setExtensions', [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '2.0.0-beta.3+build.7',
    },
  ])

  const version = Locator('.RunningExtensionVersion')
  await expect(version).toHaveText('2.0.0-beta.3+build.7')
}
