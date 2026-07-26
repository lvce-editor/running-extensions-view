import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const getIndex = (state: RunningExtensionsState, eventY: number): number => {
  const { itemHeight, y } = state
  return Math.floor((eventY - y) / itemHeight)
}
