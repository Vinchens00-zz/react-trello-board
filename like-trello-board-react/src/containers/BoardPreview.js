import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/BoardPreview.css';
import PropTypes from 'prop-types';

class BoardPreview extends React.Component {
  render() {
    const { board } = this.props;
    const { name, id } = board;

    return (
      <Link className='board-preview' to={`/boards/${id}`}>
        <span className='board-preview__name'>
          {name}
        </span>
      </Link>
    );
  }
}

BoardPreview.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
};

export default BoardPreview;