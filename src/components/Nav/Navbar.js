import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Parse from "parse";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentUser = Parse.User.current();

  const handleLogout = (e) => {
    e.preventDefault();
    logout(navigate);
  };

  return (
    <nav>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to={isAuthenticated ? "/main" : "/"}>Home</Link>
        </li>
        {isAuthenticated ? ( // Conditionally render links based on authentication status
          <>
            <li className="navbar-item">
              {currentUser && (
                <Link to={`/profile/${currentUser.id}`}>Profile</Link>
              )}
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
              <Link to="/about">About</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
