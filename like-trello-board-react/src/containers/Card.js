import React from 'react';
import '../styles/components/Card.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Card extends React.Component {
  render() {
    const { card } = this.props;

    return (
      <Link className='card' to={`/boards/${card.boardId}/cards/${card.id}`}>
        <span className='card__name'>{card.name}</span>
      </Link>
    );
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
};

export default Card;