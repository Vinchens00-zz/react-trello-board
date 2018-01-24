import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Board from '../Board';
import Boards from '../Boards';

class BoardRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/boards' component={Boards}/>
        <Route path='/boards/:boardId' component={Board}/>
      </Switch>
    );
  }
}

export default BoardRouter;