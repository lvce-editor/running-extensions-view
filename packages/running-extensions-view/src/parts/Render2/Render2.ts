import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import { renderCss } from '../RenderCss/RenderCss.ts'
import { renderDom } from '../RenderDom/RenderDom.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import { renderIncremental } from '../RenderIncremental/RenderIncremental.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

const getRenderer = (diffType: number): ((oldState: RunningExtensionsState, newState: RunningExtensionsState) => readonly any[]) => {
  switch (diffType) {
    case DiffType.RenderCss:
      return renderCss
    case DiffType.RenderDom:
      return renderDom
    case DiffType.RenderIncremental:
      return renderIncremental
    default:
      throw new Error(`Unknown diff type ${diffType}`)
  }
}

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] | Promise<readonly any[]> => {
  const { newState, oldState } = RunningExtensionsStates.get(uid)
  RunningExtensionsStates.set(uid, newState, newState)
  const commands = diffResult.map((diffType) => getRenderer(diffType)(oldState, newState))
  if (!RendererProcess.isConnected()) return commands
  return renderDirect(uid, commands)
}

const renderDirect = async (uid: number, commands: readonly any[]): Promise<readonly any[]> => {
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, commands)
  return [['Viewlet.commitPending', uid, transactionId]]
}
