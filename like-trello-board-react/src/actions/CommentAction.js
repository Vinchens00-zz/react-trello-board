import ACTIONS from '../enums/actions';
import makeRequest from '../utils/request';

export function addCommentsToStore(comments) {
  return {
    type: ACTIONS.COMMENTS.COMMENTS_LOADED,
    payload: comments
  }
}

export function addComment(cardId, comment) {
  return (dispatch) => {
    const body = JSON.stringify({ comment });

    return makeRequest(`cards/${cardId}/comments`, {
      method: 'POST',
      body
    }).then(response => {
      dispatch({
        type: ACTIONS.COMMENTS.COMMENTS_LOADED,
        payload: [response.comment]
      });
    });
  };
}
