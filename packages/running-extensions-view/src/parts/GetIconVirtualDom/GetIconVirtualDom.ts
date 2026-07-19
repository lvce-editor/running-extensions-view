import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getIconVirtualDom = (extension: RunningExtension, index?: number): readonly VirtualDomNode[] => {
  if (extension.icon) {
    return [
      {
        childCount: 0,
        className: ClassNames.RunningExtensionIcon,
        'data-index': index,
        src: extension.icon,
        type: VirtualDomElements.Img,
      },
    ]
  }
  return [
    {
      childCount: 0,
      className: mergeClassNames(
        ClassNames.RunningExtensionIcon,
        ClassNames.RunningExtensionDefaultIcon,
        ClassNames.MaskIcon,
        ClassNames.MaskIconExtensions,
      ),
      'data-index': index,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
  ]
}
