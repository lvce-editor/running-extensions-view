import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'

export const loadContent = async (state: RunningExtensionsState): Promise<RunningExtensionsState> => {
  const { assetDir, platform } = state
  const extensions = await ExtensionManagement.getRunningExtensions(assetDir, platform)
  return {
    ...state,
    extensions,
    loaded: true,
  }
}
