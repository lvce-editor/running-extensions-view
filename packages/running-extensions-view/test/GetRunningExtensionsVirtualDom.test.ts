import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getRunningExtensionsVirtualDom } from '../src/parts/GetRunningExtensionsVirtualDom/GetRunningExtensionsVirtualDom.ts'

test('renders a loading message before content is loaded', () => {
  const dom = getRunningExtensionsVirtualDom([], false)
  expect(dom[2]).toEqual({ childCount: 0, text: 'Loading running extensions…', type: VirtualDomElements.Text })
})

test('renders an empty message when no extensions are running', () => {
  const dom = getRunningExtensionsVirtualDom([], true)
  expect(dom[2]).toEqual({ childCount: 0, text: 'No running extensions', type: VirtualDomElements.Text })
})

test('renders running extension details and icon', () => {
  const dom = getRunningExtensionsVirtualDom(
    [
      {
        activationEvent: 'onStartupFinished',
        activationTime: 12.6,
        icon: '/icons/sample.png',
        id: 'sample.extension',
        name: 'Sample Extension',
        version: '1.2.3',
      },
    ],
    true,
  )
  expect(dom).toContainEqual({ childCount: 0, className: 'RunningExtensionIcon', src: '/icons/sample.png', type: VirtualDomElements.Img })
  expect(dom).toContainEqual({ childCount: 0, text: 'Sample Extension', type: VirtualDomElements.Text })
  expect(dom).toContainEqual({ childCount: 0, text: '1.2.3', type: VirtualDomElements.Text })
  expect(dom).toContainEqual({ childCount: 0, text: 'sample.extension', type: VirtualDomElements.Text })
  expect(dom).toContainEqual({ childCount: 0, text: 'Activation: 13ms', type: VirtualDomElements.Text })
})

test('falls back to the extension id and default icon', () => {
  const dom = getRunningExtensionsVirtualDom(
    [{ activationEvent: '', activationTime: 0, icon: '', id: 'sample.extension', name: '', version: '' }],
    true,
  )
  expect(dom).toContainEqual({
    childCount: 0,
    className: 'RunningExtensionIcon RunningExtensionDefaultIcon MaskIcon MaskIconExtensions',
    role: 'none',
    type: VirtualDomElements.Div,
  })
  expect(dom).toContainEqual({ childCount: 0, text: 'sample.extension', type: VirtualDomElements.Text })
})
