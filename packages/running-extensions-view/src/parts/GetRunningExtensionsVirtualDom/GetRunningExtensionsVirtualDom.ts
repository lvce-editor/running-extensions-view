import { text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getExtensionVirtualDom } from '../GetExtensionVirtualDom/GetExtensionVirtualDom.ts'

export const getRunningExtensionsVirtualDom = (extensions: readonly RunningExtension[], loaded: boolean): readonly VirtualDomNode[] => {
  const message = loaded ? 'No running extensions' : 'Loading running extensions…'
  const children =
    extensions.length === 0
      ? [
          {
            childCount: 1,
            className: 'RunningExtensionsEmpty',
            type: VirtualDomElements.Div,
          },
          text(message),
        ]
      : extensions.flatMap(getExtensionVirtualDom)
  return [
    {
      childCount: extensions.length === 0 ? 1 : extensions.length,
      className: 'RunningExtensions',
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      role: AriaRoles.List,
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}
