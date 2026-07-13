import { AriaRoles, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'

export const getIconVirtualDom = (extension: RunningExtension, index?: number): readonly VirtualDomNode[] => {
  if (extension.icon) {
    return [
      {
        childCount: 0,
        className: 'RunningExtensionIcon',
        'data-index': index,
        src: extension.icon,
        type: VirtualDomElements.Img,
      },
    ]
  }
  return [
    {
      childCount: 0,
      className: 'RunningExtensionIcon RunningExtensionDefaultIcon MaskIcon MaskIconExtensions',
      'data-index': index,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
  ]
}
