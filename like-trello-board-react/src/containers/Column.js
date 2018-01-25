import React from 'react';
import styles from '../styles/components/Column.css';
import Card from './Card';

class Column extends React.Component {
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
      </div>

    );
  }
}

export default Column;