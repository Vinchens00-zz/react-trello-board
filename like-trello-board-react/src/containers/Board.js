import React from 'react';
import { get } from 'lodash';
import styles from '../styles/components/Board.css';

class Board extends React.Component {

  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    const id = this.props.match.params.boardId;

    return (
      <div className={styles.board}>
        <span>You are on board #{id}</span>
      </div>

    );
  }
}

export default Board;