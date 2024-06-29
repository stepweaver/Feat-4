import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className='navbar'>
        <li className='navbar-item'>
          <Link to='/'>Home</Link>
        </li>
        <li className='navbar-item'>
          <Link to='/Login'>Login</Link>
        </li>
        <li className='navbar-item'>
          <Link to='/Register'>Register</Link>
        </li>
        <li className='navbar-item'>
          <Link to='/About'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
