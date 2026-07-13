import { expect, test } from '@jest/globals'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('registers the context menu listener', () => {
  expect(renderEventListeners()).toEqual([
    {
      name: 3,
      params: ['handleContextMenu', 'event.target.dataset.index', 'event.clientX', 'event.clientY'],
      preventDefault: true,
    },
  ])
})
