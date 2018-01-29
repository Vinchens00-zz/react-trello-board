import ACTIONS from '../enums/actions';
import makeRequest from '../utils/request';

export function addColumn(boardId, column) {
  return (dispatch) => {
    const body = JSON.stringify({ column });

    return makeRequest(`boards/${boardId}/columns`, {
      method: 'POST',
      body
    }).then(response => {
      dispatch({
        type: ACTIONS.COLUMN.COLUMN_CREATED,
        payload: response.column
      });
    });
  };
}

