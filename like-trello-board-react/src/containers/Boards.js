import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../styles/components/Boards.css';

import { range } from 'lodash';
import BoardPreview from './BoardPreview';
import AddForm from './AddForm';

const BOARD_LABEL = 'Create new board...';

class Boards extends React.Component {
  render() {
    const boards = range(0, 7).map(id => id + 1).map(id => {
      return { id, name: `Column #${id}` };
    });

    const list = boards.map(board => {
      return (
        <BoardPreview key={board.id} board={board}/>
      );
    });

    return (
      <div className={styles.boards}>
        {list}
        <AddForm className={styles['boards__add-form']} label={BOARD_LABEL}/>
      </div>
    );
  }
}

export default Boards;