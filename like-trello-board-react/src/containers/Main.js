import React from 'react';
import { Redirect } from 'react-router-dom';

class Main extends React.Component {
  render() {
    return (
      <Redirect to='/boards/'/>
    );
  }
}

export default Main;