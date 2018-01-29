import React from 'react';
import '../styles/components/Column.css';
import Card from './Card';
import AddForm from './AddForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CardAction from '../actions/CardActions';
import * as BoardAction from '../actions/BoardActions';
import makeRequest from '../utils/request';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import POSITION from '../enums/common';
import PropTypes from 'prop-types';

class Column extends React.Component {
  _onSubmitForm(name) {
    const { column, cards = [] } = this.props;
    const boardId = column.boardId;

    const body = JSON.stringify({
      card: {
        name,
        position: (cards.length + 1) * POSITION.STEP,
        columnId: column.id,
        description: ''
      }
    });
    const { addCard } = this.props.cardActions;

    return makeRequest(`boards/${boardId}/cards`, {
      method: 'POST',
      body
    }).then(response => {
      addCard(response.card);
    });
  }

  render() {
    const { cards = [], column } = this.props;
    const cardList = cards.map((card, index) => {
      return (
        <Draggable key={card.id} draggableId={String(card.id)} index={index}>
          {provided => (
            <div>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Card card={card}/>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      );
    });

    return (
      <Droppable droppableId={String(column.id)}>
        {provided => (
          <div className='column' ref={provided.innerRef}>
            <div className='column__column-name'>{column.name}</div>
            <div className='column__card-list'>
              {cardList}
            </div>
            <div className='column__add-form'>
              <AddForm
                label='Add a card...'
                submitForm={this._onSubmitForm.bind(this)}
              />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cardActions: bindActionCreators(CardAction, dispatch),
    boardActions: bindActionCreators(BoardAction, dispatch),
  }
}

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  cards: PropTypes.array,
  cardActions: PropTypes.object
};

export default connect(null, mapDispatchToProps)(Column);
