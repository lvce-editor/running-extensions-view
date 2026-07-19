import { ViewletCommand } from '@lvce-editor/constants'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import { getCss } from '../GetCss/GetCss.ts'

export const renderCss = (oldState: RunningExtensionsState, newState: RunningExtensionsState): readonly any[] => {
  const { width, height, uid } = newState
  const css = getCss(width, height)
  return [ViewletCommand.SetCss, uid, css]
}
