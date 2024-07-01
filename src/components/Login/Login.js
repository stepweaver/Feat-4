import React, { useState } from 'react';
import login from '../../services/loginUserService';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      console.log('User logged in:', result.user);
      alert('Welcome back ' + result.user.get('username') + '! You are now logged in!');
      navigate('/');
    } else {
      console.error('Error while logging in:', result.error);
    }
    console.log('Login submitted for:', email);
  };

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <div className='form-group'>
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
      </div>
      <button type='submit' className='submit-button'>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
