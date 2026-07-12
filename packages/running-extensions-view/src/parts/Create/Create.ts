import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: RunningExtensionsState = {
    assetDir,
    extensions: [],
    height,
    loaded: false,
    platform,
    uid,
    width,
    x,
    y,
  }
  RunningExtensionsStates.set(uid, state, state)
}
