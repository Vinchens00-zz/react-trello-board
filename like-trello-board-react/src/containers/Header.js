import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.css';

const HEADER_MESSAGE = 'Welcome to the Like Trello Board';

class Header extends React.Component {
  render() {
    return (
     <div className='header'>
       <div className='header__navigation'>
         <Link to='/boards/'>
           <i className='fa fa-table' aria-hidden='true'/> Boards
         </Link>
       </div>
       <span className='header__title'>
         {HEADER_MESSAGE}
       </span>
     </div>
    );
  }
}

export default Header;