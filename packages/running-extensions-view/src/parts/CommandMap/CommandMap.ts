import * as CopyId from '../CopyId/CopyId.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Disable from '../Disable/Disable.ts'
import * as DisableWorkspace from '../DisableWorkspace/DisableWorkspace.ts'
import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as GetMenuEntryIds from '../GetMenuEntryIds/GetMenuEntryIds.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as ReportIssue from '../ReportIssue/ReportIssue.ts'
import * as Resize from '../Resize/Resize.ts'
import * as RunningExtensionsStates from '../RunningExtensionsStates/RunningExtensionsStates.ts'
import * as SetExtensions from '../SetExtensions/SetExtensions.ts'
import * as StartProfile from '../StartProfile/StartProfile.ts'

export const commandMap = {
  'RunningExtensions.copyId': RunningExtensionsStates.wrapCommand(CopyId.copyId),
  'RunningExtensions.create': Create.create,
  'RunningExtensions.diff2': Diff2.diff2,
  'RunningExtensions.disable': RunningExtensionsStates.wrapCommand(Disable.disable),
  'RunningExtensions.disableWorkspace': RunningExtensionsStates.wrapCommand(DisableWorkspace.disableWorkspace),
  'RunningExtensions.dispose': RunningExtensionsStates.dispose,
  'RunningExtensions.getCommandIds': RunningExtensionsStates.getCommandIds,
  'RunningExtensions.getMenuEntries': RunningExtensionsStates.wrapGetter(GetMenuEntries.getMenuEntries),
  'RunningExtensions.getMenuEntryIds': GetMenuEntryIds.getMenuEntryIds,
  'RunningExtensions.handleContextMenu': RunningExtensionsStates.wrapCommand(HandleContextMenu.handleContextMenu),
  'RunningExtensions.loadContent': RunningExtensionsStates.wrapCommand(LoadContent.loadContent),
  'RunningExtensions.render2': Render2.render2,
  'RunningExtensions.renderEventListeners': RenderEventListeners.renderEventListeners,
  'RunningExtensions.reportIssue': RunningExtensionsStates.wrapCommand(ReportIssue.reportIssue),
  'RunningExtensions.resize': RunningExtensionsStates.wrapCommand(Resize.resize),
  'RunningExtensions.setExtensions': RunningExtensionsStates.wrapCommand(SetExtensions.setExtensions),
  'RunningExtensions.startProfile': RunningExtensionsStates.wrapCommand(StartProfile.startProfile),
}
