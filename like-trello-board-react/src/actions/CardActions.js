import ACTIONS from '../enums/actions';

export function addCard(card) {
  return {
    type: ACTIONS.CARD.CARD_CREATED,
    payload: card
  }
}

export function updateCard(card) {
  return {
    type: ACTIONS.CARD.CARD_UPDATED,
    payload: card
  }
}

export function addCardsToStore(cards) {
  return {
    type: ACTIONS.CARD.CARDS_LOADED,
    payload: cards
  }
}

