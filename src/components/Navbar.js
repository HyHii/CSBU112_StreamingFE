import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <h1 className="text-xl font-bold text-white">Streaming Web</h1>
      <div>
        <Link to="./components/login.js" className="text-white mr-4 hover:underline">
          Login
        </Link>
        <Link to="./components/signup.js" className="text-white hover:underline">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
