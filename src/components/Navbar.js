import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext từ AuthProvider
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (window.location.pathname === "/profile") {
      navigate("/login"); 
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          <Link to="/" className="text-gray-300 hover:text-white">
            Streaming Web
          </Link>
        </h1>
        <div className="space-x-4">
          {!isLoggedIn && (
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup" className="hover:text-white">
              Sign Up
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/profile" className="hover:text-white">
              Profile
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout} // Gọi hàm handleLogout thay vì logout
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
