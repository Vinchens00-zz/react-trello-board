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

  _renderAddForm() {
    const buttonClickHandler = this._onAddButtonClick.bind(this);
    const toggleModeHandler = this._toggleMode.bind(this, false);

    return (
      <div>
        <textarea ref='nameInput' className={styles['add-form__input']} placeholder='Print name here'></textarea>
        <button className={styles['add-form__button']} onClick={buttonClickHandler}>Add</button>
        <span className={styles['add-form__close-icon']} onClick={toggleModeHandler}>
          <i className='fa fa-times' aria-hidden='true'></i>
        </span>
      </div>
    );
  }

  _renderLabel() {
    const { label = DEFAULT_LABEL } = this.props;

    return (<button className={styles['add-form__label']} onClick={this._toggleMode.bind(this, true)}>{label}</button>);
  }

  _toggleMode(isOpen = false, e) {
    e.preventDefault();
    const state = this.state;
    this.setState({ ...state, isOpen: isOpen });
  }

  _onAddButtonClick(e) {
    const value = ReactDOM.findDOMNode(this.refs.nameInput).value;
    if (value.length) {
      console.log(value); // TODO send action to change state here
      this._toggleMode(false, e);
    } else {
      e.preventDefault();
    }
  }

  render() {
    const { isOpen = false } = this.state;

    return (
      <div className={`${styles['add-form']} ${isOpen ? 'add-form--opened' : 'add-form--closed'}`}>
        {isOpen ? this._renderAddForm() : this._renderLabel()}
      </div>

    );
  }
}

export default AddForm;