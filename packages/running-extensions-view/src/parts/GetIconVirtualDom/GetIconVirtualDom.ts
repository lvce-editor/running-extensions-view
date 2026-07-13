import { AriaRoles, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'

export const getIconVirtualDom = (extension: RunningExtension): readonly VirtualDomNode[] => {
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
