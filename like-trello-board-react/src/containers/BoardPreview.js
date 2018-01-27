import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/BoardPreview.css';

class BoardPreview extends React.Component {
  render() {
    const { board } = this.props;
    const { name, id } = board;

    return (
      <Link className={styles['board-preview']} to={`/boards/${id}`}>
        <span className={styles['board-preview__name']}>
          {name}
        </span>
      </Link>
    );
  }
}

export default BoardPreview;