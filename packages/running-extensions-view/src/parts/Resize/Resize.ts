import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

interface Dimensions {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

export const resize = (state: RunningExtensionsState, dimensions: Dimensions): RunningExtensionsState => {
  return {
    ...state,
    ...dimensions,
  }
}
