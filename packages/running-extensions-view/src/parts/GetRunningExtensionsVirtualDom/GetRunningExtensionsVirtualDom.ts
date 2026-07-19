import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getExtensionVirtualDom } from '../GetExtensionVirtualDom/GetExtensionVirtualDom.ts'
import { getRunningExtensionsEmptyDom } from '../GetRunningExtensionsEmptyVirtualDom/GetRunningExtensionsEmptyVirtualDom.ts'

export const getRunningExtensionsVirtualDom = (
  extensions: readonly RunningExtension[],
  loaded: boolean,
  focusedIndex: number = -1,
  selectedIndex: number = -1,
): readonly VirtualDomNode[] => {
  if (extensions.length === 0) {
    return getRunningExtensionsEmptyDom(loaded)
  }
  const children = extensions.flatMap((extension, index) => getExtensionVirtualDom(extension, index, index === focusedIndex, index === selectedIndex))
  return [
    {
      childCount: extensions.length,
      className: ClassNames.RunningExtensions,
      onClick: DomEventListenerFunctions.HandleClick,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      role: AriaRoles.List,
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}
