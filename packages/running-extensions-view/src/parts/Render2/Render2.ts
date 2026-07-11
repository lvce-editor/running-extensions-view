import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import { renderCss } from '../RenderCss/RenderCss.ts'
import { renderDom } from '../RenderDom/RenderDom.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

const getRenderer = (diffType: number): ((oldState: RunningExtensionsState, newState: RunningExtensionsState) => readonly any[]) => {
  switch (diffType) {
    case DiffType.RenderCss:
      return renderCss
    case DiffType.RenderDom:
      return renderDom
    default:
      throw new Error(`Unknown diff type ${diffType}`)
  }
}

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] => {
  const { newState, oldState } = RunningExtensionsStates.get(uid)
  RunningExtensionsStates.set(uid, newState, newState)
  return diffResult.map((diffType) => getRenderer(diffType)(oldState, newState))
}
