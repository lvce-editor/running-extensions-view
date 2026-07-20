import { expect, test } from '@jest/globals'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getRunningExtensionsVirtualDom } from '../src/parts/GetRunningExtensionsVirtualDom/GetRunningExtensionsVirtualDom.ts'
import * as TabIndex from '../src/parts/TabIndex/TabIndex.ts'

const expectedActivationReason = { childCount: 0, text: 'Activation reason: onStartupFinished', type: VirtualDomElements.Text }
const expectedActivationTime = { childCount: 0, text: 'Activation: 13ms', type: VirtualDomElements.Text }
const expectedEmptyMessage = { childCount: 0, text: 'No running extensions', type: VirtualDomElements.Text }
const expectedExtensionId = { childCount: 0, text: 'sample.extension', type: VirtualDomElements.Text }
const expectedExtensionName = { childCount: 0, text: 'Sample Extension', type: VirtualDomElements.Text }
const expectedExtensionVersion = { childCount: 0, text: '1.2.3', type: VirtualDomElements.Text }
const expectedIcon = {
  childCount: 0,
  className: 'RunningExtensionIcon',
  'data-index': 0,
  src: '/icons/sample.png',
  type: VirtualDomElements.Img,
}
const expectedLoadingMessage = { childCount: 0, text: 'Loading running extensions…', type: VirtualDomElements.Text }

test('registers the context menu listener on the list', () => {
  const dom = getRunningExtensionsVirtualDom([], true)
  expect(dom[0]).toEqual({
    childCount: 1,
    className: mergeClassNames('RunningExtensions', 'Grow'),
    onBlur: DomEventListenerFunctions.HandleBlur,
    onClick: DomEventListenerFunctions.HandleClick,
    onContextMenu: DomEventListenerFunctions.HandleContextMenu,
    role: AriaRoles.List,
    tabIndex: TabIndex.Focusable,
    type: VirtualDomElements.Div,
  })
})

test('grows the populated list to fit the editor content', () => {
  const dom = getRunningExtensionsVirtualDom(
    [
      {
        activationEvent: '',
        activationTime: 0,
        icon: '',
        id: 'sample.extension',
        name: 'Sample Extension',
        version: '1.0.0',
      },
    ],
    true,
  )

  expect(dom[0]).toMatchObject({
    className: mergeClassNames('RunningExtensions', 'Grow'),
  })
})

test('renders a loading message before content is loaded', () => {
  const dom = getRunningExtensionsVirtualDom([], false)
  expect(dom[2]).toEqual(expectedLoadingMessage)
})

test('renders an empty message when no extensions are running', () => {
  const dom = getRunningExtensionsVirtualDom([], true)
  expect(dom[2]).toEqual(expectedEmptyMessage)
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
  expect(dom).toContainEqual(expectedIcon)
  expect(dom).toContainEqual(expectedExtensionName)
  expect(dom).toContainEqual(expectedExtensionVersion)
  expect(dom).toContainEqual(expectedExtensionId)
  expect(dom).toContainEqual(expectedActivationTime)
  expect(dom).toContainEqual(expectedActivationReason)
})

test('registers one delegated click listener and renders the selected extension', () => {
  const extension = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  const dom = getRunningExtensionsVirtualDom([extension, extension], true, -1, 1)
  expect(dom[0]).toMatchObject({
    childCount: 2,
    onClick: DomEventListenerFunctions.HandleClick,
  })
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: mergeClassNames('RunningExtension', 'ExtensionActive'),
      'data-index': 1,
    }),
  )
})

test('falls back to the extension id and default icon', () => {
  const dom = getRunningExtensionsVirtualDom(
    [{ activationEvent: '', activationTime: 0, icon: '', id: 'sample.extension', name: '', version: '' }],
    true,
  )
  expect(dom).toContainEqual({
    childCount: 0,
    className: mergeClassNames('RunningExtensionIcon', 'RunningExtensionDefaultIcon', 'MaskIcon', 'MaskIconExtensions'),
    'data-index': 0,
    role: AriaRoles.None,
    type: VirtualDomElements.Div,
  })
  expect(dom).toContainEqual(expectedExtensionId)
})

test('renders a focus outline on the focused extension', () => {
  const extension = {
    activationEvent: 'onStartupFinished',
    activationTime: 1,
    icon: '',
    id: 'sample.extension',
    name: 'Sample Extension',
    version: '1.0.0',
  }
  const dom = getRunningExtensionsVirtualDom([extension, extension], true, 1, -1, true)

  const rows = dom.filter((node) => node.role === AriaRoles.ListItem)
  expect(rows).toEqual([
    expect.objectContaining({ className: 'RunningExtension', 'data-index': 0 }),
    expect.objectContaining({ className: mergeClassNames('RunningExtension', 'FocusOutline'), 'data-index': 1 }),
  ])
})
