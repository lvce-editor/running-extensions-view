import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: RunningExtensionsState = {
    assetDir,
    extensions: [],
    focusedIndex: -1,
    focusOutline: false,
    height,
    itemHeight: 72,
    loaded: false,
    platform,
    selectedIndex: -1,
    uid,
    width,
    x,
    y,
  }
  RunningExtensionsStates.set(uid, state, state)
}
