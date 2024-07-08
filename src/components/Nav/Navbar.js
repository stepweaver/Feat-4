import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser, checkUser } from '../../Services/authService';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkUser());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(checkUser());
    };
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser().then(() => {
      setIsAuthenticated(false);
    });
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
              <Link to='/' onClick={handleLogout}>
                Logout
              </Link>
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
