import React from 'react';
import styles from '../styles/components/Card.css';

class Card extends React.Component {
  render() {
    const { card } = this.props;

    return (
      <div className={styles.card}>
        <span className={styles.card__name}>{card.name}</span>
      </div>
    );
  }
}

export default Card;