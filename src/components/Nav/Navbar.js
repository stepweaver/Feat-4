import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkUser, logoutUser } from '../../Services/authService'; 
import Parse from 'parse';
import './Navbar.css'; 

const Navbar = () => {
  const isAuthenticated = checkUser(); // Check if the user is authenticated
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(navigate); // Handle user logout and navigate
  } 

  return (
    <nav>
      <ul className='navbar'>
        <li className='navbar-item'>
          <Link to='/'>Home</Link>
        </li>
        {isAuthenticated ? ( // Conditionally render links based on authentication status
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

export default Navbar; // Export the Navbar component
