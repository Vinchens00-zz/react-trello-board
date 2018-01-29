import ACTIONS from '../enums/actions';
import makeRequest from '../utils/request';
import notFound from '../utils/notFound';

export function addCard(boardId, card) {
  return (dispatch) => {
    const body = JSON.stringify({ card });

    return makeRequest(`boards/${boardId}/cards`, {
      method: 'POST',
      body
    }).then(response => {
      dispatch({
        type: ACTIONS.CARD.CARD_CREATED,
        payload: response.card
      });
    });
  };
}

export function updateCard(cardId, card) {
  return (dispatch) => {
    const body = JSON.stringify({ card });

    return makeRequest(`cards/${cardId}`, {
      method: 'PATCH',
      body
    }).then(response => {
      dispatch({
        type: ACTIONS.CARD.CARD_UPDATED,
        payload: response.card
      });
    });
  };
}

export function loadCard(boardId, cardId) {
  return (dispatch) => {
    makeRequest(`boards/${boardId}/cards/${cardId}`)
      .then(response => {
        dispatch({
          type: ACTIONS.CARD.CARDS_LOADED,
          payload: [response.card]
        });

        dispatch({
          type: ACTIONS.COMMENTS.COMMENTS_LOADED,
          payload: response.comments
        });
      })
      .catch(notFound);
  };
}

