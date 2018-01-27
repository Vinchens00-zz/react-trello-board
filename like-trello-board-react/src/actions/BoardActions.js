import ACTIONS from '../enums/actions';

export function addBoards(boards) {
  return {
    type: ACTIONS.BOARD.BOARDS_LOADED,
    payload: boards
  }
}

export function addBoard(board) {
  return {
    type: ACTIONS.BOARD.BOARD_CREATED,
    payload: board
  }
}

export function addDetailedBoard(board) {
  return {
    type: ACTIONS.BOARD.DETAILED_BOARD_LOADED,
    payload: board
  };
}
