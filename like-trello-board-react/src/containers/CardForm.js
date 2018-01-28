import React from 'react';
import styles from '../styles/components/CardForm.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import AddForm from './AddForm';
import * as CardAction from '../actions/CardActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import makeRequest from '../utils/request';

const NEW_COMMENT_LABEL = 'Add new comment...';
const NEW_COMMENT_PLACEHOLDER = 'Type your comment here';
const DESCRIPTION_LABEL = 'Edit description...';
const DESCRIPTION_PLACEHOLDER = 'Type description here';
const DESCRIPTION_BUTTON_TEXT = 'Save';

class CardForm extends React.Component {
  componentWillMount() {
    const { cardId, boardId } = this.props.match.params;
    makeRequest(`boards/${boardId}/cards/${cardId}`)
      .then(response => {
        const { addCardsToStore } = this.props.cardActions;
        addCardsToStore([response.card]);
      })
  }

  _onSubmitNewComment(message) {
    console.log(message); // TODO
    return new Promise(resolve => resolve());
  }

  _onUpdateDescription(description) {
    const cardId = this.props.match.params.cardId;
    const body = JSON.stringify({
      card: { description }
    });
    const { updateCard } = this.props.cardActions;

    return makeRequest(`cards/${cardId}`, {
      method: 'PATCH',
      body
    }).then(response => {
      updateCard(response.card);
    });
  }

  _getData(boardId, cardId) {
    const { cards } = this.props;
    // TODO process 404 here
    const card = cards.find(card => card.id === cardId);
    if (!card) {
      return {
        card: {}
      };
    }

    return {
      card
    };
  }

  render() {
    const { cardId, boardId } = this.props.match.params;
    const { card } = this._getData(+boardId, +cardId);

    return (
      <Modal
        isOpen={true}
        overlayClassName={styles['card-form__overlay']}
        className={styles['card-form__content']}
        portalClassName='card-form'
        contentLabel='Card Form'
      >
        <div className={styles['card-form__header']}>
          <h3 className={styles['card-form__header__card-name']}>
            <i className='fa fa-id-card-o' aria-hidden='true'/>{card.name}
          </h3>
          <span className={styles['card-form__header__close-icon']}>
            <Link to='/boards/35'>
              <i className='fa fa-times' aria-hidden='true'/>
            </Link>
          </span>
        </div>

        <div className={styles['card-form__body']}>
          <div className={styles['card-form__body__description']}>
            <AddForm
              label={DESCRIPTION_LABEL}
              submitForm={this._onUpdateDescription.bind(this)}
              placeholder={DESCRIPTION_PLACEHOLDER}
              buttonText={DESCRIPTION_BUTTON_TEXT}
              defaultValue={card.description}
            />
            <span className={styles['card-form__body__description__value']}>
              {card.description || '-' }
            </span>
          </div>

          <div className={styles['card-form__body__add-comment-form']}>
            <h3>
              <i className='fa fa-comments' aria-hidden='true'/> Add Comment:
            </h3>
            <AddForm
              label={NEW_COMMENT_LABEL}
              submitForm={this._onSubmitNewComment.bind(this)}
              placeholder={NEW_COMMENT_PLACEHOLDER}
            />
          </div>

          <div className={styles['card-form__body__comments']}>
            <h3><i className='fa fa-list' aria-hidden='true'/> Comments:</h3>
            <div>Comment 1</div>
            <div>Comment 2</div>
            <div>Comment 2</div>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProp(state) {
  return {
    cards: state.cards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cardActions: bindActionCreators(CardAction, dispatch)
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(CardForm);
