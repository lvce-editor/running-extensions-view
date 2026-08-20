import { ViewletCommand } from '@lvce-editor/constants'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import { getCss } from '../GetCss/GetCss.ts'

export const renderCss = (oldState: RunningExtensionsState, newState: RunningExtensionsState): readonly any[] => {
  const { height, uid, width } = newState
  // TODO this is not needed
  const css = getCss(width, height)
  return [ViewletCommand.SetCss, uid, css]
}
