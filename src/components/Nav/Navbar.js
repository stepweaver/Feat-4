import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { logoutUser } from '../../Services/authService';
import Parse from 'parse';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentUser = Parse.User.current();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(navigate, () => setIsAuthenticated(false));
  };

  return (
    <nav>
      <ul className='navbar'>
        <li className='navbar-item'>
          <Link to={isAuthenticated ? '/main' : '/'}>Home</Link>
        </li>
        {currentUser && (
          <li className='navbar-item'>
            <Link to={`/profile/${currentUser.id}`}>Profile</Link>
          </li>
        )}
        <li className='navbar-item'>
          <Link to='/about'>About</Link>
        </li>
        <li className='navbar-item'>
          <Link to='/' onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
