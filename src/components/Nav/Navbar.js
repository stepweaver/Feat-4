import React from "react"; // Importing React
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { useAuth } from "../../Services/authUserService"; // Importing useAuth hook from authUserService
import "./Navbar.css"; // Importing CSS for the Navbar component

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Destructuring isAuthenticated and logout from useAuth hook

  // Function to handle logout action
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    logout(); // Call logout function from useAuth hook
  };

  return (
    <nav>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? ( // Conditional rendering based on authentication status
          <>
            <li className="navbar-item">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="navbar-item">
              <Link to="/about">About</Link>
            </li>
            <li className="navbar-item">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="navbar-item">
              <Link to="/about">About</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar; 
