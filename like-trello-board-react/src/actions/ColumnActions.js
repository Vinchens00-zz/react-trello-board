import ACTIONS from '../enums/actions';

export function addColumn(column) {
  return {
    type: ACTIONS.COLUMN.COLUMN_CREATED,
    payload: column
  }
}

