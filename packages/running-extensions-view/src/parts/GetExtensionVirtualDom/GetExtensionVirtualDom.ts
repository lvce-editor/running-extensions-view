import { text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import { getIconVirtualDom } from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getExtensionVirtualDom = (extension: RunningExtension): readonly VirtualDomNode[] => {
  const displayName = extension.name || extension.id
  return [
    {
      childCount: 3,
      className: 'RunningExtension',
      role: 'listitem',
      type: VirtualDomElements.Div,
    },
    ...getIconVirtualDom(extension),
    {
      childCount: 2,
      className: 'RunningExtensionDetails',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'RunningExtensionTitle',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'RunningExtensionName',
      type: VirtualDomElements.Strong,
    },
    text(displayName),
    {
      childCount: 1,
      className: 'RunningExtensionVersion',
      type: VirtualDomElements.Span,
    },
    text(extension.version),
    {
      childCount: 1,
      className: 'RunningExtensionId',
      type: VirtualDomElements.Div,
    },
    text(extension.id),
    {
      childCount: 1,
      className: 'RunningExtensionActivationTime',
      type: VirtualDomElements.Div,
    },
    text(`Activation: ${Math.round(extension.activationTime)}ms`),
  ]
}
