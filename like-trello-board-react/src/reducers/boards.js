import ACTIONS from '../enums/actions';

const { assign } = Object;

function _addDetailedFlag(object, value) {
  return assign({ hasDetails: value }, object);
}

function _loadBoards(state, boards) {
  const ignoreIds = state.map(board => board.id);

  boards = boards.filter(board => !ignoreIds.includes(board.id))
    .map(board => _addDetailedFlag(board, false));

  return state.concat(boards);
}

function _addCreatedBoard(state, board) {
  const boards = Array.from(state);
  boards.push(board);

  return boards;
}

function _addBoardWithDetails(state, detailedBoard) {
  detailedBoard = _addDetailedFlag(detailedBoard, true);
  state = Array.from(state);

  const existingBoard = state.find(board => board.id === detailedBoard.id);
  if (!existingBoard) {
    state.push(detailedBoard);
    return state;
  }

  assign(existingBoard, detailedBoard);

  return state;
}

export default function boards(state = [], action) {
  switch(action.type) {
    case ACTIONS.BOARD.BOARDS_LOADED:
      return _loadBoards(state, action.payload);

    case ACTIONS.BOARD.BOARD_CREATED:
      return _addCreatedBoard(state, action.payload);

    case ACTIONS.BOARD.DETAILED_BOARD_LOADED:
      return _addBoardWithDetails(state, action.payload.board);

    default:
      return state;
  }
}
