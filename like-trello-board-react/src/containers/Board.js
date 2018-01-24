import React from 'react';

class Board extends React.Component {
  render() {
    const id = this.props.match.params.boardId;
    return (
      <span>You are on board #{id}</span>
    );
  }
}

export default Board;