import { RendererWorker } from '@lvce-editor/rpc-registry'
import { commit } from '../Commit/Commit.ts'
import { commitDate } from '../CommitDate/CommitDate.ts'
import { version } from '../Version/Version.ts'

export const getElectronVersion = RendererWorker.getElectronVersion

export const getNodeVersion = RendererWorker.getNodeVersion

export const getChromeVersion = RendererWorker.getChromeVersion

export const getVersion = async (): Promise<string> => {
  return version
}

export const getCommit = async (): Promise<string> => {
  return commit
}

export const getV8Version = RendererWorker.getV8Version

export const getDate = (): string => {
  return commitDate
}
