import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Boards from './containers/Boards';
import Board from './containers/Board';

export const URLs = {
  index: '/',
  board: '/boards/:boardId/'
};

export const routes = (
  <div>
    <Route path={URLs.index} component={Boards}/>
    <Route path={URLs.board} component={Board}/>
  </div>
);
