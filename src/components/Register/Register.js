import React, { useState } from 'react';
import { registerUser } from '../../services/registerUserService';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(username, email, password, repeatPass).then((user) => {
      console.log('User Registered', user);
      alert('Right on! You are now registered!');
      navigate('/login');
    });
  };

  return (
    <form onSubmit={handleSubmit} className='register-form'>
      <div className='form-group'>
        <label htmlFor='username'>Username: </label>
        <input
          type='username'
          id='username'
          className='form-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          id='email'
          className='form-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          className='form-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor='repeatPass'>Repeat Password: </label>
        <input
          type='password'
          id='repeatPass'
          className='form-input'
          value={repeatPass}
          onChange={(e) => setRepeatPass(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='submit-button'>
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
