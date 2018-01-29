import React from 'react';
import { pick } from 'lodash';
import '../styles/components/Board.css';
import Column from './Column';
import AddForm from './AddForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BoardAction from '../actions/BoardActions';
import * as ColumnAction from '../actions/ColumnActions';
import * as CardAction from '../actions/CardActions';
import makeRequest from '../utils/request';
import { Route } from 'react-router-dom';
import CardForm from './CardForm';
import { DragDropContext } from 'react-beautiful-dnd';
import COMMON from '../enums/common';
import PropTypes from 'prop-types';

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

    const boardCards = cards.filter(card => card.boardId === board.id).sort((a, b) => a.position - b.position);
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

  _updatePosition(data) {
    const { cardId } = data;
    const body = JSON.stringify({
      card: pick(data, ['columnId', 'position'])
    });
    const { updateCard } = this.props.cardActions;

    return makeRequest(`cards/${cardId}`, {
      method: 'PATCH',
      body
    }).then(response => {
      updateCard(response.card);
    });
  }

  _onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const {
      draggableId: cardId,
      destination: {
        index: newPosition,
        droppableId: newColumnId
      },
      source: {
        index: oldPosition,
        droppableId: oldColumnId
      }
    } = result;

    const boardId = +this.props.match.params.boardId;
    const { grouptedCards } = this._getData(boardId);

    const cards = grouptedCards[newColumnId] || [];

    const index = oldPosition < newPosition && newColumnId === oldColumnId ? newPosition + 1 : newPosition;
    const before = cards[index - 1] ? cards[index - 1].position : 0;
    const after = cards[index] ? cards[index].position : (cards.length + 1) * COMMON.STEP;
    const position = (after - before) / 2 + before;


    this._updatePosition({ cardId, columnId: newColumnId, position });
  }

  render() {
    const { match } = this.props;
    const boardId = +match.params.boardId;
    const { board, grouptedCards, columns } = this._getData(boardId);

    return (
      <DragDropContext onDragEnd={this._onDragEnd.bind(this)}>
        <div className='board'>
          <div className='board__name'>{board.name}</div>
          {this._renderColumns(columns, grouptedCards)}
          <AddForm
            label={COLUMN_LABEL}
            className='board__add-form'
            submitForm={this._onSubmitForm.bind(this)}
          />
          <Route path={`${match.path}/cards/:cardId`} component={CardForm}/>
        </div>
      </DragDropContext>
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
    columnActions: bindActionCreators(ColumnAction, dispatch),
    cardActions: bindActionCreators(CardAction, dispatch)
  }
}

Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      boardId: PropTypes.string
    })
  }),
  boardActions: PropTypes.object,
  columnActions: PropTypes.object,
  cardActions: PropTypes.object,
  boards: PropTypes.array,
  cards: PropTypes.array,
  columns: PropTypes.array
};

export default connect(mapStateToProp, mapDispatchToProps)(Board);
