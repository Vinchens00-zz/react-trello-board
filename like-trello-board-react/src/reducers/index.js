import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import boards from './boards';
import columns from './columns';
import cards from './cards';
import comments from './comments';

const rootReducer = combineReducers({
  routing: routerReducer,
  boards,
  columns,
  cards,
  comments
});

export default rootReducer;
