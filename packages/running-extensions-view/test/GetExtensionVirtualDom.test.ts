import { expect, test } from '@jest/globals'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
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
    { childCount: 3, className: 'RunningExtension', 'data-index': 7, role: AriaRoles.ListItem, type: VirtualDomElements.Div },
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

test('renders the remote SSH authority', () => {
  const dom = getExtensionVirtualDom(
    {
      activationEvent: 'onStartupFinished',
      activationTime: 12.6,
      icon: '/icons/sample.png',
      id: 'sample.extension',
      name: 'Sample Extension',
      remoteAuthority: 'ssh-remote+89.167.102.168',
      version: '1.2.3',
    },
    7,
  )

  expect(dom).toContainEqual({
    childCount: 1,
    className: mergeClassNames('RunningExtensionId', 'RunningExtensionRemoteAuthority'),
    'data-index': 7,
    type: VirtualDomElements.Div,
  })
  expect(dom).toContainEqual({ childCount: 0, text: 'SSH: 89.167.102.168', type: VirtualDomElements.Text })
  expect(dom).toContainEqual({ childCount: 3, className: 'RunningExtensionDetails', 'data-index': 7, type: VirtualDomElements.Div })
})

test('renders a plain remote SSH host', () => {
  const dom = getExtensionVirtualDom({
    activationEvent: 'onStartupFinished',
    activationTime: 12.6,
    icon: '/icons/sample.png',
    id: 'sample.extension',
    name: 'Sample Extension',
    remoteAuthority: 'remote.example.com',
    version: '1.2.3',
  })

  expect(dom).toContainEqual({ childCount: 0, text: 'SSH: remote.example.com', type: VirtualDomElements.Text })
})

test('renders a focus outline', () => {
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
    true,
  )

  expect(dom[0]).toMatchObject({
    className: mergeClassNames('RunningExtension', 'FocusOutline'),
    'data-index': 7,
  })
})
