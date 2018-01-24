import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class Main extends React.Component {
  render() {
    return (
      <Redirect to='/boards/1'/>
    );
  }
}

export default Main;