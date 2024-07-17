import React, { createContext, useState, useEffect } from "react";
import Parse from "parse";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = Parse.User.current();
    setIsAuthenticated(!!currentUser);
  }, []);

  const login = async (credentials) => {
    try {
      const user = await Parse.User.logIn(
        credentials.email,
        credentials.password
      );
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  };

  const logout = async (navigate) => {
    try {
      await Parse.User.logOut();
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
