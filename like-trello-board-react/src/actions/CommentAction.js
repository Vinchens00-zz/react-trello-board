import ACTIONS from '../enums/actions';

export function addCommentsToStore(comments) {
  return {
    type: ACTIONS.COMMENTS.COMMENTS_LOADED,
    payload: comments
  }
}
