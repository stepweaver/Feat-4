import React, { useEffect, useState } from "react";
import { loginUser, checkUser } from "../../Services/authService";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser.email && currentUser.password) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("email")} has been logged in successfully!`
          );
          navigate("/"); // Navigate to the protected route after successful login
        }
      });
    }
  };

  return (
    <div>
      <LoginForm
        user={currentUser}
        isLogin={true}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login; // Export the Login component
