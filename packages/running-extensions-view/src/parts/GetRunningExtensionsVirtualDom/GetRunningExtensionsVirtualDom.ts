import { text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getExtensionVirtualDom } from '../GetExtensionVirtualDom/GetExtensionVirtualDom.ts'

const getRunningExtensionsEmptyDom = (loaded: boolean): readonly VirtualDomNode[] => {
  const message = loaded ? 'No running extensions' : 'Loading running extensions…'

  return [
    {
      childCount: 1,
      className: 'RunningExtensions',
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      role: 'list',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'RunningExtensionsEmpty',
      type: VirtualDomElements.Div,
    },
    text(message),
  ]
}

export const getRunningExtensionsVirtualDom = (extensions: readonly RunningExtension[], loaded: boolean): readonly VirtualDomNode[] => {
  if (extensions.length === 0) {
    return getRunningExtensionsEmptyDom(loaded)
  }
  const children = extensions.flatMap(getExtensionVirtualDom)
  return [
    {
      childCount: extensions.length,
      className: 'RunningExtensions',
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      role: AriaRoles.List,
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}
