import React from 'react';
import styles from '../styles/components/Header.css';

const HEADER_MESSAGE = 'Welcome to Like Trello Board';

class Header extends React.Component {
  render() {
    return (
     <div className={styles.header}>
       <span className={styles.header__title}>
         {HEADER_MESSAGE}
       </span>
     </div>
    );
  }
}

export default Header;