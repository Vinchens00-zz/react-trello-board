import ACTIONS from '../enums/actions';

const { assign } = Object;

function _addCardsToStore(state, cards) {
  const ignoredId = state.map(card => card.id);

  return state.concat(cards.filter(card => !ignoredId.includes(card.id)));
}

function _addCard(state, newCard) {
  return state.concat(newCard);
}

function _updateCard(state, updatedCard) {
  let card = state.find(card => card.id === updatedCard.id);
  assign(card, updatedCard);

  return Array.from(state);
}

export default function cards(state = [], action) {
  switch(action.type) {
    case ACTIONS.BOARD.DETAILED_BOARD_LOADED:
      return _addCardsToStore(state, action.payload.cards);

    case ACTIONS.CARD.CARD_CREATED:
      return _addCard(state, action.payload);

    case ACTIONS.CARD.CARD_UPDATED:
      return _updateCard(state, action.payload);

    case ACTIONS.CARD.CARDS_LOADED:
      return _addCardsToStore(state, action.payload);

    default:
      return state;
  }
}