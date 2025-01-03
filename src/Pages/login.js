import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Dùng AuthContext để gọi login
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://csbu-software-design-be.onrender.com/api/account/login",
        { name, password }
      );
      if (response.status === 200) {
        setSuccessMessage('Đăng nhập thành công!');
        login(response.data.data, name); // Cập nhật trạng thái đăng nhập ngay lập tức
        setTimeout(() => {
          navigate('/'); // Chuyển hướng sang trang chính
        }, 1500);
      }
    } catch (err) {
      setError("Đăng nhập thất bại!");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <form
        className="bg-gray-900 p-6 rounded-lg shadow-md w-80"
        onSubmit={handleLogin}
      >
        <h2 className="text-lg font-bold text-center text-white mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-300">Username:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 text-black rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-300">Password:</label>
        <input
          type="password"
          className="w-full p-2 mb-4 text-black rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;