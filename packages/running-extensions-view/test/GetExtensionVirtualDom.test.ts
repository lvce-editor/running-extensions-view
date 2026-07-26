import { expect, test } from '@jest/globals'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import { getExtensionVirtualDom } from '../src/parts/GetExtensionVirtualDom/GetExtensionVirtualDom.ts'

const expectedActivationDetails = {
  childCount: 1,
  className: 'RunningExtensionActivationDetails',
  type: VirtualDomElements.Div,
}

const expectedDom = [
  { childCount: 3, className: 'RunningExtension', role: AriaRoles.ListItem, type: VirtualDomElements.Div },
  { childCount: 0, className: 'RunningExtensionIcon', src: '/icons/sample.png', type: VirtualDomElements.Img },
  { childCount: 2, className: 'RunningExtensionDetails', type: VirtualDomElements.Div },
  { childCount: 2, className: 'RunningExtensionTitle', type: VirtualDomElements.Div },
  { childCount: 1, className: 'RunningExtensionName', type: VirtualDomElements.Strong },
  { childCount: 0, text: 'Sample Extension', type: VirtualDomElements.Text },
  { childCount: 1, className: 'RunningExtensionVersion', type: VirtualDomElements.Span },
  { childCount: 0, text: '1.2.3', type: VirtualDomElements.Text },
  { childCount: 1, className: 'RunningExtensionId', type: VirtualDomElements.Div },
  { childCount: 0, text: 'sample.extension', type: VirtualDomElements.Text },
  { childCount: 2, className: 'RunningExtensionActivationDetails', type: VirtualDomElements.Div },
  { childCount: 1, className: 'RunningExtensionActivationTime', type: VirtualDomElements.Div },
  { childCount: 0, text: 'Activation: 13ms', type: VirtualDomElements.Text },
  {
    childCount: 1,
    className: 'RunningExtensionActivationReason',
    type: VirtualDomElements.Div,
  },
  { childCount: 0, text: 'Activation reason: onStartupFinished', type: VirtualDomElements.Text },
]

const expectedFallbackName = { childCount: 0, text: 'sample.extension', type: VirtualDomElements.Text }

const expectedPlainRemoteAuthority = { childCount: 0, text: 'SSH: remote.example.com', type: VirtualDomElements.Text }

const expectedRemoteAuthority = { childCount: 0, text: 'SSH: 89.167.102.168', type: VirtualDomElements.Text }

const expectedRemoteDetails = { childCount: 3, className: 'RunningExtensionDetails', type: VirtualDomElements.Div }

test('renders extension details', () => {
  const dom = getExtensionVirtualDom({
    activationEvent: 'onStartupFinished',
    activationTime: 12.6,
    icon: '/icons/sample.png',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.2.3',
  })

  expect(dom).toEqual(expectedDom)
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

  expect(dom).toContainEqual(expectedFallbackName)
  expect(dom).toContainEqual(expectedActivationDetails)
  expect(dom).not.toContainEqual(expect.objectContaining({ className: expect.stringContaining('RunningExtensionActivationReason') }))
})

test('adds the active class when the extension is selected', () => {
  const dom = getExtensionVirtualDom(
    {
      activationEvent: 'onStartupFinished',
      activationTime: 1,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
    false,
    true,
  )

  expect(dom[0]).toMatchObject({ className: mergeClassNames('RunningExtension', 'ExtensionActive') })
})

test('renders the remote SSH authority', () => {
  const dom = getExtensionVirtualDom({
    activationEvent: 'onStartupFinished',
    activationTime: 12.6,
    icon: '/icons/sample.png',
    id: 'sample.extension',
    name: 'Sample Extension',
    remoteAuthority: 'ssh-remote+89.167.102.168',
    version: '1.2.3',
  })

  expect(dom).toContainEqual({
    childCount: 1,
    className: mergeClassNames('RunningExtensionId', 'RunningExtensionRemoteAuthority'),
    type: VirtualDomElements.Div,
  })
  expect(dom).toContainEqual(expectedRemoteAuthority)
  expect(dom).toContainEqual(expectedRemoteDetails)
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

  expect(dom).toContainEqual(expectedPlainRemoteAuthority)
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
    true,
  )

  expect(dom[0]).toMatchObject({
    className: mergeClassNames('RunningExtension', 'FocusOutline'),
  })
})

test('renders an activation error instead of an activation time', () => {
  const dom = getExtensionVirtualDom({
    activationEvent: 'onCommand:sample.run',
    activationTime: 0,
    error: 'Cannot find main.js',
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    status: 'error',
    version: '1.0.0',
  })

  expect(dom).toContainEqual({
    childCount: 1,
    className: mergeClassNames('RunningExtensionStatus', 'RunningExtensionStatusError'),
    type: VirtualDomElements.Div,
  })
  expect(dom).toContainEqual({ childCount: 0, text: 'Error: Cannot find main.js', type: VirtualDomElements.Text })
  expect(dom).not.toContainEqual(expect.objectContaining({ className: 'RunningExtensionActivationTime' }))
})

test('renders a terminated worker status', () => {
  const dom = getExtensionVirtualDom({
    activationEvent: 'onStartupFinished',
    activationTime: 10,
    error: 'Extension worker stopped responding',
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    status: 'terminated',
    version: '1.0.0',
  })

  expect(dom).toContainEqual({
    childCount: 1,
    className: mergeClassNames('RunningExtensionStatus', 'RunningExtensionStatusTerminated'),
    type: VirtualDomElements.Div,
  })
  expect(dom).toContainEqual({
    childCount: 0,
    text: 'Terminated: Extension worker stopped responding',
    type: VirtualDomElements.Text,
  })
})

test('falls back for invalid names and versions', () => {
  const dom = getExtensionVirtualDom({
    activationEvent: '',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 42,
    version: 42,
  })

  expect(dom).toContainEqual(expectedFallbackName)
  expect(dom).toContainEqual({ childCount: 0, text: '', type: VirtualDomElements.Text })
})

test('renders fallback messages for statuses without error details', () => {
  const extension = {
    activationEvent: '',
    activationTime: 0,
    error: '',
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }

  expect(getExtensionVirtualDom({ ...extension, status: 'error' })).toContainEqual({
    childCount: 0,
    text: 'Error: Activation failed',
    type: VirtualDomElements.Text,
  })
  expect(getExtensionVirtualDom({ ...extension, status: 'terminated' })).toContainEqual({
    childCount: 0,
    text: 'Terminated: Extension worker stopped',
    type: VirtualDomElements.Text,
  })
})
