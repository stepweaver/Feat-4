import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/authUserService';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav>
      <ul className='navbar'>
        <li className='navbar-item'>
          <Link to='/'>Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className='navbar-item'>
              <Link to='/profile'>Profile</Link>
            </li>
            <li className='navbar-item'>
              <Link to='/about'>About</Link>
            </li>
            <li className='navbar-item'>
              <Link to='/' onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className='navbar-item'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='navbar-item'>
              <Link to='/register'>Register</Link>
            </li>
            <li className='navbar-item'>
              <Link to='/about'>About</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;