import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('registers the context menu listener', () => {
  expect(renderEventListeners()).toEqual([
    {
      name: DomEventListenerFunctions.HandleContextMenu,
      params: ['handleContextMenu', 'event.target.dataset.index', 'event.clientX', 'event.clientY'],
      preventDefault: true,
    },
  ])
})
