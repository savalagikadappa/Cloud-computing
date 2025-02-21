import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // e.g., email
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // Optionally fetch user data from backend here
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    setUser(userData);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};