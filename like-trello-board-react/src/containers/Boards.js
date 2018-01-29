import React from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/components/Boards.css';
import { range } from 'lodash';
import BoardPreview from './BoardPreview';
import AddForm from './AddForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import makeRequest from '../utils/request';
import * as BoardAction from '../actions/BoardActions';

const BOARD_LABEL = 'Create new board...';

class Boards extends React.Component {
  componentWillMount() {
    makeRequest('boards')
      .then(response => {
        const { addBoards } = this.props.boardActions;
        addBoards(response.boards);
      })
  }

  _onSubmitForm(name) {
    const body = JSON.stringify({
      board: { name }
    });
    const { addBoard } = this.props.boardActions;

    return makeRequest('boards', {
      method: 'POST',
      body
    }).then(response => addBoard(response.board));
  }

  render() {
    const { boards } = this.props;

    const boardList = boards.map(board => {
      return (
        <BoardPreview key={board.id} board={board}/>
      );
    });

    return (
      <div className='boards'>
        {boardList}
        <AddForm
          className='boards__add-form'
          label={BOARD_LABEL}
          submitForm={this._onSubmitForm.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    boards: state.boards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    boardActions: bindActionCreators(BoardAction, dispatch)
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(Boards);