import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Main/Main';
import Navbar from './Nav/Navbar';
import Login from './Login/Login';
import Register from './Register/Register';
import About from './About/About';
import Profile from './Profile/Profile';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Unauthorized from './Unauthorized/Unauthorized';

const Components = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Main /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>
  );
};

export default Components;