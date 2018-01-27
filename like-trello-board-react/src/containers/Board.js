import React from 'react';
import { get, pick } from 'lodash';
import styles from '../styles/components/Board.css';
import Column from './Column';
import { range } from 'lodash';
import AddForm from './AddForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BoardAction from '../actions/BoardActions';
import makeRequest from '../utils/request';

const COLUMN_LABEL = 'Add a column...';

class Board extends React.Component {
  componentWillMount() {
    const boardId = this.props.match.params.boardId;
    makeRequest(`boards/${boardId}`)
      .then(response => {
        const { addDetailedBoard } = this.props.boardActions;
        addDetailedBoard(pick(response, ['board', 'columns', 'cards']));
      })
  }

  _getData(boardId) {
    const { boards, cards, columns } = this.props;

    const board = boards.find(board => board.id === boardId) || {};
    const boardCards = cards ? cards.filter(card => board.cards.includes(card.id)) : [];
    const boardColumns = columns ? columns.filter(column => board.columns.includes(column.id)) : [];

    const grouptedCards = boardCards.reduce((result, card) => {
      const columnId = card.columnId;
      if (result[columnId]) {
        result[columnId].push(card);
      } else {
        result[columnId] = [card];
      }

      return result;
    }, {});

    return {
      board,
      cards: boardCards,
      columns: boardColumns,
      grouptedCards
    };
  }

  _renderColumns(columns, groupedCards) {
    return columns.map(column => {
      const cards = groupedCards[column.id];
      return (<Column column={column} cards={cards}/>);
    });
  }

  render() {
    const boardId = this.props.match.params.boardId;
    const { board, grouptedCards, columns } = this._getData(boardId);

    return (
      <div className={styles.board}>
        <div className={styles.board__name}>{board.name}</div>
        {this._renderColumns(columns, grouptedCards)}
        <AddForm label={COLUMN_LABEL} className={styles['board__add-form']}/>
      </div>

    );
  }
}

function mapStateToProp(state) {
  return {
    boards: state.boards,
    cards: state.cards,
    columns: state.columns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    boardActions: bindActionCreators(BoardAction, dispatch)
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(Board);
