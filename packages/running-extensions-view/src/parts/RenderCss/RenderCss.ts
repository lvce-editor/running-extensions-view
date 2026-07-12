import { ViewletCommand } from '@lvce-editor/constants'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import { getCss } from '../GetCss/GetCss.ts'

export const renderCss = (oldState: RunningExtensionsState, newState: RunningExtensionsState): readonly any[] => {
  const css = getCss(newState.width, newState.height)
  return [ViewletCommand.SetCss, newState.uid, css]
}
