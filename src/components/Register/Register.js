import React, { useEffect, useState } from 'react';
import { createUser, checkUser } from '../../Services/authService';
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      alert('You are already logged in');
      navigate('/'); // TODO: double-check what will be the protected route component?
    }
  }, [navigate]);

  useEffect(() => {
    if (newUser && isAuthenticated) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(`${userCreated.get('firstName')} ${userCreated.get('lastName')} has been registered successfully!`);
          navigate('/'); // TODO: double-check what will be the protected route component?
        }
        setIsAuthenticated(false);
      })
    }
  }, [newUser, isAuthenticated, navigate]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(name, newValue);

    setNewUser({
      ...newUser,
      [name]: newValue
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted: ', e.target);
    setIsAuthenticated(true);
  }

  return (
    <div>
      <RegisterForm 
        user={newUser}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Register;