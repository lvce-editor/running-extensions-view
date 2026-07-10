import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { AboutState } from '../AboutState/AboutState.ts'

export const { clear, dispose, get, getCommandIds, getKeys, registerCommands, set, wrapCommand } = ViewletRegistry.create<AboutState>()
