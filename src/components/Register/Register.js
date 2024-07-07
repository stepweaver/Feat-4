import React, { useState } from 'react'; // Importing React and useState hook
import { createUser } from '../../Services/authService'; // Importing createUser function from authService
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
import './Register.css'; // Importing CSS for the Register component

function RegisterForm() {
  const [username, setUsername] = useState(''); // State for storing username input
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const [repeatPass, setRepeatPass] = useState(''); // State for storing repeat password input
  const navigate = useNavigate(); // Hook for navigating programmatically

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    createUser(username, email, password, repeatPass).then((user) => {
      // Call createUser function with input values
      console.log('User Registered', user); // Log the registered user details to the console
      alert('Right on! You are now registered!'); // Show a registration success alert
      navigate('/login'); // Navigate to the login page
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
          value={username} // Value of username state
          onChange={(e) => setUsername(e.target.value)} // Update username state on change
          required // Making username input required
        />
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
        <label htmlFor='repeatPass'>Repeat Password: </label>
        <input
          type='password'
          id='repeatPass'
          className='form-input'
          value={repeatPass} // Value of repeatPass state
          onChange={(e) => setRepeatPass(e.target.value)} // Update repeatPass state on change
          required // Making repeat password input required
        />
      </div>
      <button type='submit' className='submit-button'>
        Register
      </button>
    </form>
  );
}

export default RegisterForm; // Exporting RegisterForm component as default export
