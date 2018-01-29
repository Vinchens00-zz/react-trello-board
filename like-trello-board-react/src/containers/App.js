import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BoardRouter from './routes/BoardRouter';
import Main from './Main';
import Header from './Header';
import Modal from 'react-modal';

class App extends React.Component {
  componentWillMount() {
    Modal.setAppElement('#app');
  }

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