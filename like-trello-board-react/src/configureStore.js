import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers';

const reduxRouterMiddleware = routerMiddleware(browserHistory);

function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(reduxRouterMiddleware)
  ));

  return store;
}

export default configureStore;