// in src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // We need to install this library

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const getUserRole = () => {
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role; // Assumes the role is in the token payload
    } catch (error) {
      console.error("Invalid token:", error);
      logout(); // Log out if token is invalid
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};