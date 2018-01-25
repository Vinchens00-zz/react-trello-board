import React from 'react';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import BoardRouter from './routes/BoardRouter';
import Main from './Main';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <main>
        <Header/>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/boards' component={BoardRouter}/>
        </Switch>
      </main>
    );
  }
}

export default App;