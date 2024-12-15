import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Streaming Web
          </Link>
        </h1>
        <div className="space-x-4">
          <Link
            to="/streampage"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Stream Page
          </Link>

          {!isLoggedIn && <Link to="/login" className="hover:text-white">Login</Link>}
          {!isLoggedIn && <Link to="/signup" className="hover:text-white">Sign Up</Link>}
          {isLoggedIn && <Link to="/profile" className="hover:text-white">Profile</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;