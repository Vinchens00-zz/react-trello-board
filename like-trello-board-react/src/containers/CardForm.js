import React from 'react';
import styles from '../styles/components/CardForm.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import AddForm from './AddForm';

const NEW_COMMENT_LABEL = 'Add new comment...';
const NEW_COMMENT_PLACEHOLDER = 'Type your comment here';
const DESCRIPTION_LABEL = 'Edit description...';
const DESCRIPTION_PLACEHOLDER = 'Type description here';
const DESCRIPTION_BUTTON_TEXT = 'Save';

class CardForm extends React.Component {
  componentWillMount() {
  }

  _onSubmitNewComment(message) {
    console.log(message); // TODO
    return new Promise(resolve => resolve());
  }

  _onUpdateDescription(description) {
    console.log(description); // TODO
    return new Promise(resolve => resolve());
  }

  render() {
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
            <i className='fa fa-id-card-o' aria-hidden='true'/> Card Name
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
              defaultValue='Your description'
            />
            <span className={styles['card-form__body__description__value']}>
              Your description;
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

export default CardForm;