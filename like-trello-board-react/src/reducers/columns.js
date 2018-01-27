import ACTIONS from '../enums/actions';

function _addColumnsToStore(state, columns) {
  const ignoredId = state.map(column => column.id);

  return state.concat(columns.filter(column => !ignoredId.includes(column.id)));
}

export default function columns(state = [], action) {
  switch(action.type) {
    case ACTIONS.BOARD.DETAILED_BOARD_LOADED:
      return _addColumnsToStore(state, action.payload.columns);

    default:
      return state;
  }
}