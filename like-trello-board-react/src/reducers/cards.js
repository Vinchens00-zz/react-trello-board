import ACTIONS from '../enums/actions';

function _addCardsToStore(state, cards) {
  const ignoredId = state.map(card => card.id);

  return state.concat(cards.filter(card => !ignoredId.includes(card.id)));
}

function _addCard(state, newCard) {
  return state.concat(newCard);
}

export default function cards(state = [], action) {
  switch(action.type) {
    case ACTIONS.BOARD.DETAILED_BOARD_LOADED:
      return _addCardsToStore(state, action.payload.cards);

    case ACTIONS.CARD.CARD_CREATED:
      return _addCard(state, action.payload);

    default:
      return state;
  }
}