import { ViewletCommand } from '@lvce-editor/constants'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const renderCss = (oldState: RunningExtensionsState, newState: RunningExtensionsState): readonly any[] => {
  return [ViewletCommand.SetCss, newState.uid, `width: ${newState.width}px; height: ${newState.height}px;`]
}
