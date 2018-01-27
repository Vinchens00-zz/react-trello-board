import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/Header.css';

const HEADER_MESSAGE = 'Welcome to the Like Trello Board';

class Header extends React.Component {
  render() {
    return (
     <div className={styles.header}>
       <div className={styles.header__navigation}>
         <Link to='/boards/'>
           <i className='fa fa-table' aria-hidden='true'></i> Boards
         </Link>
       </div>
       <span className={styles.header__title}>
         {HEADER_MESSAGE}
       </span>
     </div>
    );
  }
}

export default Header;