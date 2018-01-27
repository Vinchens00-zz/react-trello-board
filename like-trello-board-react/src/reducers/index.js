import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import boards from './boards';
import columns from './columns';
import cards from './cards';

const rootReducer = combineReducers({
  routing: routerReducer,
  boards,
  columns,
  cards
});

export default rootReducer;
