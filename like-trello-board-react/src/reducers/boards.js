import ACTIONS from '../enums/actions';

export default function boards(state = [], action) {
  switch(action.type) {
    case ACTIONS.BOARD.BOARDS_LOADED:
      return action.payload;

    case ACTIONS.BOARD.BOARD_CREATED:
      const boards = Array.from(state);
      boards.push(action.payload);
      return boards;

    default:
      return state;
  }
}
