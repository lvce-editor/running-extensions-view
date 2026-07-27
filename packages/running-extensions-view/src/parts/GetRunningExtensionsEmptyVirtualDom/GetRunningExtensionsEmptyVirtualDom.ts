import { mergeClassNames, type VirtualDomNode, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'

const emptyNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.RunningExtensionsEmpty,
  type: VirtualDomElements.Li,
}

const getMessage = (loaded: boolean): string => {
  const message = loaded ? RunningExtensionsStrings.noRunningExtensions() : RunningExtensionsStrings.loadingRunningExtensions()
  return message
}

export const getRunningExtensionsEmptyDom = (loaded: boolean): readonly VirtualDomNode[] => {
  const message = getMessage(loaded)
  return [
    {
      childCount: 1,
      className: mergeClassNames(ClassNames.RunningExtensions, ClassNames.Grow),
      onBlur: DomEventListenerFunctions.HandleBlur,
      onClick: DomEventListenerFunctions.HandleClick,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Ul,
    },
    emptyNode,
    text(message),
  ]
}
