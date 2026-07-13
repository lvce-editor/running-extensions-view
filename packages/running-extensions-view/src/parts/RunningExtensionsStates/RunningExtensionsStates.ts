import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { RunningExtensionsState } from '../RunningExtensionsState/RunningExtensionsState.ts'

export const { diff, dispose, get, getCommandIds, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<RunningExtensionsState>()
