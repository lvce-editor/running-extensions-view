import * as DiffModules from '../DiffModules/DiffModules.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState } = RunningExtensionsStates.get(uid)
  const domDiffType = oldState.loaded ? DiffType.RenderIncremental : DiffType.RenderDom
  return RunningExtensionsStates.diff(uid, [DiffModules.isDomEqual, DiffModules.isCssEqual], [domDiffType, DiffType.RenderCss])
}
