import { expect, test } from '@jest/globals'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import { getIconVirtualDom } from '../src/parts/GetIconVirtualDom/GetIconVirtualDom.ts'

const expectedImageDom = [
  {
    childCount: 0,
    className: 'RunningExtensionIcon',
    src: '/icons/sample.png',
    type: VirtualDomElements.Img,
  },
]

test('renders an image when the extension has an icon', () => {
  const dom = getIconVirtualDom({
    activationEvent: '',
    activationTime: 0,
    icon: '/icons/sample.png',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.2.3',
  })

  expect(dom).toEqual(expectedImageDom)
})

test('renders the default icon when the extension has no icon', () => {
  const dom = getIconVirtualDom({
    activationEvent: '',
    activationTime: 0,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.2.3',
  })

  expect(dom).toEqual([
    {
      childCount: 0,
      className: mergeClassNames('RunningExtensionIcon', 'RunningExtensionDefaultIcon', 'MaskIcon', 'MaskIconExtensions'),
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
  ])
})
