import ACTIONS from '../enums/actions';

export function addCard(card) {
  return {
    type: ACTIONS.CARD.CARD_CREATED,
    payload: card
  }
}

