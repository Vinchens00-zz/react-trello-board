import React from 'react';
import '../styles/components/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className='not-found'>
        <span className='not-found__icon'>¯\_(ツ)_/¯</span>
        <span className='not-found__message'>
          It looks like page you requested does not exist. Please, go to the main page and try again!
        </span>
      </div>
    );
  }
}

export default NotFound;