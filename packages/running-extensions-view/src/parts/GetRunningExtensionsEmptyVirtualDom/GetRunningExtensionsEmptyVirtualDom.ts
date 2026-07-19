import { type VirtualDomNode, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

export const getRunningExtensionsEmptyDom = (loaded: boolean): readonly VirtualDomNode[] => {
  const message = loaded ? RunningExtensionsStrings.noRunningExtensions() : RunningExtensionsStrings.loadingRunningExtensions()

  return [
    {
      childCount: 1,
      className: ClassNames.RunningExtensions,
      onClick: DomEventListenerFunctions.HandleClick,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      role: AriaRoles.List,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.RunningExtensionsEmpty,
      type: VirtualDomElements.Div,
    },
    text(message),
  ]
}
