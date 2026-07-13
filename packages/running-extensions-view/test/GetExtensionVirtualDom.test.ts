import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getExtensionVirtualDom } from '../src/parts/GetExtensionVirtualDom/GetExtensionVirtualDom.ts'

test('renders extension details', () => {
  const dom = getExtensionVirtualDom(
    {
      activationEvent: 'onStartupFinished',
      activationTime: 12.6,
      icon: '/icons/sample.png',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.2.3',
    },
    7,
  )

  expect(dom).toEqual([
    { childCount: 3, className: 'RunningExtension', 'data-index': 7, role: 'listitem', type: VirtualDomElements.Div },
    { childCount: 0, className: 'RunningExtensionIcon', 'data-index': 7, src: '/icons/sample.png', type: VirtualDomElements.Img },
    { childCount: 2, className: 'RunningExtensionDetails', 'data-index': 7, type: VirtualDomElements.Div },
    { childCount: 2, className: 'RunningExtensionTitle', 'data-index': 7, type: VirtualDomElements.Div },
    { childCount: 1, className: 'RunningExtensionName', 'data-index': 7, type: VirtualDomElements.Strong },
    { childCount: 0, text: 'Sample Extension', type: VirtualDomElements.Text },
    { childCount: 1, className: 'RunningExtensionVersion', 'data-index': 7, type: VirtualDomElements.Span },
    { childCount: 0, text: '1.2.3', type: VirtualDomElements.Text },
    { childCount: 1, className: 'RunningExtensionId', 'data-index': 7, type: VirtualDomElements.Div },
    { childCount: 0, text: 'sample.extension', type: VirtualDomElements.Text },
    { childCount: 1, className: 'RunningExtensionActivationTime', 'data-index': 7, type: VirtualDomElements.Div },
    { childCount: 0, text: 'Activation: 13ms', type: VirtualDomElements.Text },
  ])
})

test('uses the extension id when the name is empty', () => {
  const dom = getExtensionVirtualDom({
    activationEvent: '',
    activationTime: 0,
    icon: '',
    id: 'sample.extension',
    name: '',
    version: '',
  })

  expect(dom).toContainEqual({ childCount: 0, text: 'sample.extension', type: VirtualDomElements.Text })
})
