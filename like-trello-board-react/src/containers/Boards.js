import React from 'react';
import { Redirect } from 'react-router-dom';

class Boards extends React.Component {
  render() {
    return (
      <Redirect to='/boards/1'/>
    );
  }
}

export default Boards;