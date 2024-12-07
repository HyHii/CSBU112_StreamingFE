import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;