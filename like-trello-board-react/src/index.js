import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, BrowserRouter } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import App from './containers/App';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('app')
);
