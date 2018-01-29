import ACTIONS from '../enums/actions';
import makeRequest from '../utils/request';
import { pick } from 'lodash';
import notFound from '../utils/notFound';

export function addBoards() {
  return (dispatch) => {
    makeRequest('boards')
      .then(response => {
        dispatch({
          type: ACTIONS.BOARD.BOARDS_LOADED,
          payload: response.boards
        });
      });
  };
}

export function addBoard(board) {
  return (dispatch) => {
    const body = JSON.stringify({ board });

    return makeRequest('boards', {
      method: 'POST',
      body
    }).then(response => {
      dispatch({
        type: ACTIONS.BOARD.BOARD_CREATED,
        payload: response.board
      });
    });
  };
}

export function loadBoard(boardId) {
  return (dispatch) => {
    makeRequest(`boards/${boardId}`)
      .then(response => {
        dispatch({
          type: ACTIONS.BOARD.DETAILED_BOARD_LOADED,
          payload: pick(response, ['board', 'columns', 'cards'])
        });
      })
      .catch(notFound);
  };
}
