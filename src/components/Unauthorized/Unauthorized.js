import React from 'react';
import './Unauthrozied.css';

const Unauthorized = () => {
  return (
    <div className='unauthorized-container'>
      <h1>403 - Unauthorized Access</h1>
      <p>Sorry, you do not have permission to view this page.</p>
      <a href='/login'>Please Login</a>
    </div>
  );
};

export default Unauthorized;