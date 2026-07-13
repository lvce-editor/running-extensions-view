import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getIconVirtualDom } from '../src/parts/GetIconVirtualDom/GetIconVirtualDom.ts'

test('renders an image when the extension has an icon', () => {
  const dom = getIconVirtualDom(
    {
      activationEvent: '',
      activationTime: 0,
      icon: '/icons/sample.png',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.2.3',
    },
    2,
  )

  expect(dom).toEqual([
    {
      childCount: 0,
      className: 'RunningExtensionIcon',
      'data-index': 2,
      src: '/icons/sample.png',
      type: VirtualDomElements.Img,
    },
  ])
})

test('renders the default icon when the extension has no icon', () => {
  const dom = getIconVirtualDom(
    {
      activationEvent: '',
      activationTime: 0,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.2.3',
    },
    2,
  )

  expect(dom).toEqual([
    {
      childCount: 0,
      className: 'RunningExtensionIcon RunningExtensionDefaultIcon MaskIcon MaskIconExtensions',
      'data-index': 2,
      role: 'none',
      type: VirtualDomElements.Div,
    },
  ])
})
