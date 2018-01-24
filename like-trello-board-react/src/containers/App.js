import React from 'react';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import BoardRouter from './routes/BoardRouter';
import Main from './Main';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/boards' component={BoardRouter}/>
      </Switch>
    );
  }
}

export default App;