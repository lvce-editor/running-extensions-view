import * as DiffModules from '../DiffModules/DiffModules.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  return RunningExtensionsStates.diff(uid, [DiffModules.isDomEqual, DiffModules.isCssEqual], [DiffType.RenderDom, DiffType.RenderCss])
}
