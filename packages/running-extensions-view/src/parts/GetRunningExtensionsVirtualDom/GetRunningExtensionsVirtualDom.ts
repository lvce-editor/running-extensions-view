import { AriaRoles, text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'

const getIconVirtualDom = (extension: RunningExtension): readonly VirtualDomNode[] => {
  if (extension.icon) {
    return [
      {
        childCount: 0,
        className: 'RunningExtensionIcon',
        src: extension.icon,
        type: VirtualDomElements.Img,
      },
    ]
  }
  return [
    {
      childCount: 0,
      className: 'RunningExtensionIcon RunningExtensionDefaultIcon MaskIcon MaskIconExtensions',
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
  ]
}

const getExtensionVirtualDom = (extension: RunningExtension): readonly VirtualDomNode[] => {
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
      role: 'list',
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}
