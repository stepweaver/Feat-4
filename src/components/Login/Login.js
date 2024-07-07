import React, { useState } from 'react'; // Importing React and useState hook
import login from '../../Services/loginUserService'; // Importing login function from loginUserService
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
import { useAuth } from '../../Services/authUserService'; // Importing useAuth hook from authUserService
import './Login.css'; // Importing CSS for the Login component

function LoginForm() {
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const navigate = useNavigate(); // Hook for navigating programmatically
  const { setIsAuthenticated } = useAuth(); // Getting setIsAuthenticated function from useAuth hook

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const result = await login(email, password); // Call the login function with email and password
    if (result.success) {
      // If login is successful
      console.log('User logged in:', result.user); // Log the user details to the console
      alert(
        'Welcome ' + result.user.get('username') + '! You are now logged in!'
      ); // Show a welcome alert
      setIsAuthenticated(true); // Set authentication state to true
      navigate('/profile'); // Navigate to the profile page
    } else {
      console.error('Error while logging in:', result.error); // Log the error if login fails
    }
    console.log('Login submitted for:', email); // Log the email for which login was submitted
  };

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      {' '}
      <div className='form-group'>
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          id='email'
          className='form-input'
          value={email} // Value of email state
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          required // Making email input required
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          className='form-input'
          value={password} // Value of password state
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          required // Making password input required
        />
      </div>
      <button type='submit' className='submit-button'>
        {'Submit'}
      </button>
    </form>
  );
}

export default LoginForm;
