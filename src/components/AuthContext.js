import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (token, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    navigate("/login"); // Chuyển hướng về trang Login
  };

  useEffect(() => {
    // Kiểm tra token hết hạn khi app load
    const token = localStorage.getItem("token");
    if (!token) {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
