import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { routes } from './routes';

import configureStore from './configureStore';

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app')
);
