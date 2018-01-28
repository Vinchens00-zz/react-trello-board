import ACTIONS from '../enums/actions';

function _addColumnsToStore(state, columns) {
  const ignoredId = state.map(column => column.id);
  return state.concat(columns.filter(column => !ignoredId.includes(column.id)));
}

function _addColumn(state, column) {
  return state.concat(column);
}

export default function columns(state = [], action) {
  switch(action.type) {
    case ACTIONS.BOARD.DETAILED_BOARD_LOADED:
      return _addColumnsToStore(state, action.payload.columns);

    case ACTIONS.COLUMN.COLUMN_CREATED:
      return _addColumn(state, action.payload);

    default:
      return state;
  }
}