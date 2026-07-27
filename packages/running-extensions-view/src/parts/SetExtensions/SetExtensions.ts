import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

const getDisplayName = (extension: RunningExtension): string => {
  return typeof extension.name === 'string' && extension.name ? extension.name : extension.id
}

const compareExtension = (extensionA: RunningExtension, extensionB: RunningExtension): number => {
  return getDisplayName(extensionA).localeCompare(getDisplayName(extensionB)) || extensionA.id.localeCompare(extensionB.id)
}

export const setExtensions = (state: RunningExtensionsState, extensions: readonly RunningExtension[]): RunningExtensionsState => {
  return {
    ...state,
    extensions: extensions.toSorted(compareExtension),
  }
}
