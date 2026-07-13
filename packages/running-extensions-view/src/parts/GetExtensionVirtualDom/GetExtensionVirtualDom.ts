import { text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { getIconVirtualDom } from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getExtensionVirtualDom = (extension: RunningExtension, index?: number): readonly VirtualDomNode[] => {
  const displayName = extension.name || extension.id
  return [
    {
      childCount: 3,
      className: 'RunningExtension',
      'data-index': index,
      role: AriaRoles.ListItem,
      type: VirtualDomElements.Div,
    },
    ...getIconVirtualDom(extension, index),
    {
      childCount: 2,
      className: 'RunningExtensionDetails',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'RunningExtensionTitle',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'RunningExtensionName',
      'data-index': index,
      type: VirtualDomElements.Strong,
    },
    text(displayName),
    {
      childCount: 1,
      className: 'RunningExtensionVersion',
      'data-index': index,
      type: VirtualDomElements.Span,
    },
    text(extension.version),
    {
      childCount: 1,
      className: 'RunningExtensionId',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(extension.id),
    {
      childCount: 1,
      className: 'RunningExtensionActivationTime',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(`Activation: ${Math.round(extension.activationTime)}ms`),
  ]
}
