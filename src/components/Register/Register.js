import React, { useEffect, useState } from "react";
import { createUser, checkUser } from "../../Services/authService"; 
import RegisterForm from "./RegisterForm"; 
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }); // State to store new user details

  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/"); // Navigate to the home page if already logged in
    }
  }, [navigate]);

  useEffect(() => {
    if (newUser && isAuthenticated) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")} ${userCreated.get(
              "lastName"
            )} has been registered successfully!`
          );
          navigate("/"); // Navigate to the home page after successful registration
        }
        setIsAuthenticated(false); // Reset authentication status
      });
    }
  }, [newUser, isAuthenticated, navigate]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;

    setNewUser({
      ...newUser,
      [name]: newValue,
    }); // Update new user state with form input values
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true); // Set authentication status to true to trigger user creation
  };

  return (
    <div>
      <RegisterForm
        user={newUser}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />{" "}
      {/* Render the registration form */}
    </div>
  );
};

export default Register; // Export the Register component
