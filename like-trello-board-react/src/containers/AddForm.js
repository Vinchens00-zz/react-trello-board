import React from 'react';
import ReactDOM from 'react-dom';
import { get } from 'lodash';
import '../styles/components/AddForm.css';

const DEFAULT_LABEL = 'Add a card...';
const DEFAULT_PLACEHOLDER = 'Print name here';
const DEFAULT_BUTTON_TEXT = 'Add';

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

    const { placeholder = DEFAULT_PLACEHOLDER, defaultValue = '', buttonText = DEFAULT_BUTTON_TEXT } = this.props;


    return (
      <div className='form-container'>
        <textarea ref='nameInput' defaultValue={defaultValue} className='add-form__input' placeholder={placeholder}/>
        <button className='add-form__button' onClick={buttonClickHandler}>{buttonText}</button>
        <span className='add-form__close-icon' onClick={toggleModeHandler}>
          <i className='fa fa-times' aria-hidden='true'/>
        </span>
      </div>
    );
  }

  _renderLabel() {
    const { label = DEFAULT_LABEL } = this.props;

    return (<button className='add-form__label' onClick={this._toggleMode.bind(this, true)}>{label}</button>);
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
      <div className={`add-form ${isOpen ? 'add-form--opened' : 'add-form--closed'} ${className}`}>
        {isOpen ? this._renderAddForm() : this._renderLabel()}
      </div>

    );
  }
}

export default AddForm;