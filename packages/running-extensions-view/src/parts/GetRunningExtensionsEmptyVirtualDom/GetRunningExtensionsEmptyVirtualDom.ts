import { type VirtualDomNode, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getRunningExtensionsEmptyDom = (loaded: boolean): readonly VirtualDomNode[] => {
  const message = loaded ? 'No running extensions' : 'Loading running extensions…'

  return [
    {
      childCount: 1,
      className: ClassNames.RunningExtensions,
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
