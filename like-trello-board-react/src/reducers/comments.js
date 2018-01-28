import ACTIONS from '../enums/actions';

function _addCommentsToStore(state, comments) {
  const ignoredId = state.map(comment => comment.id);

  return state.concat(comments.filter(comment => !ignoredId.includes(comment.id)));
}

export default function comments(state = [], action) {
  switch(action.type) {
    case ACTIONS.COMMENTS.COMMENTS_LOADED:
      return _addCommentsToStore(state, action.payload);

    default:
      return state;
  }
}