import React from 'react';
import { Navigate } from 'react-router-dom';
import Parse from 'parse';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Parse.User.current() !== null;
  return isAuthenticated ? children : <Navigate to='/unauthorized' />;
};

export default ProtectedRoute;