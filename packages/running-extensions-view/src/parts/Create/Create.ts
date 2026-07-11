import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number): void => {
  const state: RunningExtensionsState = {
    extensions: [],
    height,
    loaded: false,
    uid,
    width,
    x,
    y,
  }
  RunningExtensionsStates.set(uid, state, state)
}
