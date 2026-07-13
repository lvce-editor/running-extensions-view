import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'

export const getRunningExtensions = async (assetDir: string, platform: number): Promise<readonly RunningExtension[]> => {
  return ExtensionManagementWorker.invoke('Extensions.getRunningExtensions', assetDir, platform)
}
