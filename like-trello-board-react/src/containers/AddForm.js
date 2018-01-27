import React from 'react';
import ReactDOM from 'react-dom';
import { get } from 'lodash';
import styles from '../styles/components/AddForm.css';

const DEFAULT_LABEL = 'Add a card...';

class AddForm extends React.Component {
  componentWillMount() {
    this.setState({
      isOpen: false
    });
  }

  componentDidUpdate() {
    const { isOpen } = this.state;
    if (isOpen) {
      const ref = this.refs.nameInput;
      ReactDOM.findDOMNode(ref).focus();
    }
  }

  _renderAddForm() {
    const buttonClickHandler = this._onAddButtonClick.bind(this);
    const toggleModeHandler = this._toggleMode.bind(this, false);

    return (
      <div className={styles['form-container']}>
        <textarea ref='nameInput' className={styles['add-form__input']} placeholder='Print name here'/>
        <button className={styles['add-form__button']} onClick={buttonClickHandler}>Add</button>
        <span className={styles['add-form__close-icon']} onClick={toggleModeHandler}>
          <i className='fa fa-times' aria-hidden='true'/>
        </span>
      </div>
    );
  }

  _renderLabel() {
    const { label = DEFAULT_LABEL } = this.props;

    return (<button className={styles['add-form__label']} onClick={this._toggleMode.bind(this, true)}>{label}</button>);
  }

  _toggleMode(isOpen = false) {
    this._toggleProperty('isOpen', isOpen);
  }

  _toggleProperty(property, value) {
    const state = this.state;
    this.setState({ ...state, [property]: value });
  }

  _onAddButtonClick() {
    const value = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();

    if (value.length) {
      const { submitForm } = this.props;

      submitForm(value)
        .then(() => {
          this._toggleMode(false);
        });
    }
  }

  render() {
    const { isOpen = false } = this.state;
    const { className = '' } = this.props;

    return (
      <div className={`${styles['add-form']} ${isOpen ? 'add-form--opened' : 'add-form--closed'} ${className}`}>
        {isOpen ? this._renderAddForm() : this._renderLabel()}
      </div>

    );
  }
}

export default AddForm;