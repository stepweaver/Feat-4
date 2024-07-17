import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Services/authService"; 

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering user:", newUser); // Log the new user details
    const userRegistered = await createUser(newUser);
    if (userRegistered) {
      alert(
        `${userRegistered.get("firstName")} ${userRegistered.get(
          "lastName"
        )} has been registered successfully!`
      );
      login({ email: newUser.email, password: newUser.password }).then(() => {
        navigate("/main");
      });
    }
  };

  return (
    <div>
      <RegisterForm
        user={newUser}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
