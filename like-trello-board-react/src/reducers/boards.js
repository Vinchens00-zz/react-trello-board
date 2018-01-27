import ACTIONS from '../enums/actions';

export default function boards(state = [], action) {
  switch(action.type) {
    case ACTIONS.BOARDS_LOADED:
      return action.payload;

    default:
      return state;
  }
}
