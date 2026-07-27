import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getExtensionVirtualDom } from '../GetExtensionVirtualDom/GetExtensionVirtualDom.ts'
import { getRunningExtensionsEmptyDom } from '../GetRunningExtensionsEmptyVirtualDom/GetRunningExtensionsEmptyVirtualDom.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'

export const getRunningExtensionsVirtualDom = (
  extensions: readonly RunningExtension[],
  loaded: boolean,
  focusedIndex: number = -1,
  selectedIndex: number = -1,
  focusOutline: boolean = false,
): readonly VirtualDomNode[] => {
  if (extensions.length === 0) {
    return getRunningExtensionsEmptyDom(loaded)
  }
  return [
    {
      childCount: extensions.length,
      className: mergeClassNames(ClassNames.RunningExtensions, ClassNames.Grow),
      onBlur: DomEventListenerFunctions.HandleBlur,
      onClick: DomEventListenerFunctions.HandleClick,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Ul,
    },
    ...extensions.flatMap((extension, index) => getExtensionVirtualDom(extension, focusOutline && index === focusedIndex, index === selectedIndex)),
  ]
}
