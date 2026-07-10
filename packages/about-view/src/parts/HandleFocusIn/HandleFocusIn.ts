import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { AboutState } from '../AboutState/AboutState.ts'
import * as AboutFocusId from '../AboutFocusId/AboutFocusId.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const handleFocusIn = async (state: AboutState): Promise<AboutState> => {
  // TODO remove side effect
  await RendererWorker.setFocus(WhenExpression.FocusAbout)
  if (state.focusId) {
    return state
  }
  return {
    ...state,
    focusId: AboutFocusId.Ok,
  }
}
