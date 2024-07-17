import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
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
      login(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("email")} has been logged in successfully!`
          );
          navigate("/main");
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

export default Login;
