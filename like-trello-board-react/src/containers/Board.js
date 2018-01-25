import React from 'react';
import { get } from 'lodash';
import styles from '../styles/components/Board.css';
import Column from './Column';
import { range } from 'lodash';

class Board extends React.Component {
  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    const id = this.props.match.params.boardId;
    //const cards = [{id: 1, name: 'test'}, {id:2, name: 'test 2'}];

    const cards = range(0, 20).map(id => id + 1).map(id => {
      return { id, name: `test ${id}` };
    });

    const board = {
      name: 'Test Board'
    };

    const column = {
      id: 1,
      name: 'Test Column'
    };

    return (
      <div className={styles.board}>
        <div className={styles.board__name}>{board.name}</div>
        <Column column={column} cards={cards}/>
      </div>

    );
  }
}

export default Board;