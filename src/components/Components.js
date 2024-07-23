import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Main from './Main/Main';
import Navbar from './Nav/Navbar';
import Login from './Login/Login';
import Register from './Register/Register';
import About from './About/About';
import Profile from './Profile/Profile';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import LandingPage from './LandingPage/LandingPage';
import { AuthContext } from '../Context/AuthContext';

const Components = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path='/'
          element={isAuthenticated ? <Main /> : <LandingPage />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route
          path='/main'
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/:id'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
};

export default Components;
