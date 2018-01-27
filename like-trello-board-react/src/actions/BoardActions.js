import ACTIONS from '../enums/actions';

export function addBoards(boards) {
  return {
    type: ACTIONS.BOARDS_LOADED,
    payload: boards
  }
}
