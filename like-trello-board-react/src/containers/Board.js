import React from 'react';
import { get, pick } from 'lodash';
import styles from '../styles/components/Board.css';
import Column from './Column';
import { range } from 'lodash';
import AddForm from './AddForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BoardAction from '../actions/BoardActions';
import * as ColumnAction from '../actions/ColumnActions';
import makeRequest from '../utils/request';
import { Route, Switch } from 'react-router-dom';
import CardForm from './CardForm';

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

    const board = boards.find(board => board.id === boardId);
    if (!board) {
      // TODO redirect to 404 here
      return {
        board: {},
        cards: [],
        columns: [],
        grouptedCards: {}
      };
    }

    const boardCards = cards.filter(card => card.boardId === board.id);
    const boardColumns = columns.filter(column => column.boardId === board.id);

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
      return (<Column key={column.id} column={column} cards={cards}/>);
    });
  }

  _onSubmitForm(name) {
    const boardId = this.props.match.params.boardId;
    const body = JSON.stringify({
      column: { name }
    });
    const { addColumn } = this.props.columnActions;

    return makeRequest(`boards/${boardId}/columns`, {
      method: 'POST',
      body
    }).then(response => {
      addColumn(response.column);
    });
  }

  render() {

    const { match } = this.props;
    const boardId = +match.params.boardId;
    const { board, grouptedCards, columns } = this._getData(boardId);

    return (
      <div className={styles.board}>
        <div className={styles.board__name}>{board.name}</div>
        {this._renderColumns(columns, grouptedCards)}
        <AddForm
          label={COLUMN_LABEL}
          className={styles['board__add-form']}
          submitForm={this._onSubmitForm.bind(this)}
        />
        <Route path={`${match.path}/cards/:cardId`} component={CardForm}/>
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
    boardActions: bindActionCreators(BoardAction, dispatch),
    columnActions: bindActionCreators(ColumnAction, dispatch)
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(Board);
