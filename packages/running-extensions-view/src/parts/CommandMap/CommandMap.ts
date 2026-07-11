import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'

export const commandMap = {
  'RunningExtensions.create': Create.create,
  'RunningExtensions.diff2': Diff2.diff2,
  'RunningExtensions.dispose': RunningExtensionsStates.dispose,
  'RunningExtensions.getCommandIds': RunningExtensionsStates.getCommandIds,
  'RunningExtensions.loadContent': RunningExtensionsStates.wrapCommand(LoadContent.loadContent),
  'RunningExtensions.render2': Render2.render2,
  'RunningExtensions.renderEventListeners': RenderEventListeners.renderEventListeners,
  'RunningExtensions.resize': RunningExtensionsStates.wrapCommand(Resize.resize),
}
