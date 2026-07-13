import { EventExpression } from '@lvce-editor/constants'

export const renderEventListeners = (): readonly any[] => {
  return [
    {
      name: 3,
      params: ['handleContextMenu', 'event.target.dataset.index', EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
  ]
}
