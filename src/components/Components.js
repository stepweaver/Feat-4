import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main/Main';
import Navbar from './Nav/Navbar';
import Login from './Login/Login';
import Register from './Register/Register';
import About from './About/About';
import Profile from './Profile/Profile';

const Components = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
  );
};

export default Components;
