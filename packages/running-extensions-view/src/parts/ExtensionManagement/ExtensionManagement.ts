import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'

export const getRunningExtensions = async (): Promise<readonly RunningExtension[]> => {
  return RendererWorker.invoke('ExtensionManagement.getRunningExtensions')
}
