import React from 'react';
import styles from '../styles/components/Column.css';
import Card from './Card';
import AddForm from './AddForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CardAction from '../actions/CardActions';
import * as BoardAction from '../actions/BoardActions';
import makeRequest from '../utils/request';

class Column extends React.Component {
  _onSubmitForm(name) {
    const { column } = this.props;
    const boardId = column.boardId;

    const body = JSON.stringify({
      card: {
        name,
        position: 0.1, // TODO
        columnId: column.id,
        description: '' // TODO
      }
    });
    const { addCard } = this.props.cardActions;
    const { addCardToBoard } = this.props.boardActions;

    return makeRequest(`boards/${boardId}/cards`, {
      method: 'POST',
      body
    }).then(response => {
      addCard(response.cards);
      addCardToBoard(response.card);
    });
  }

  render() {
    const { cards = [], column } = this.props;
    const cardList = cards.map(card => {
      return (
        <Card key={card.id} card={card}/>
      );
    });

    return (
      <div className={styles.column}>
        <div className={styles['column__column-name']}>{column.name}</div>
        <div className={styles['column__card-list']}>
          {cardList}
        </div>
        <div className={styles['column__add-form']}>
          <AddForm
            label='Add a card...'
            submitForm={this._onSubmitForm.bind(this)}
          />
        </div>
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cardActions: bindActionCreators(CardAction, dispatch),
    boardActions: bindActionCreators(BoardAction, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Column);
