import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Xóa thông báo lỗi trước đó
    setSuccessMessage(null); // Xóa thông báo thành công trước đó

    try {
      const response = await axios.post(
        'https://marmoset-unbiased-logically.ngrok-free.app/api/account/login',
        {
          name: name,
          password: password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        const token = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        setSuccessMessage('Đăng nhập thành công!');
        setError(null);
        setTimeout(() => {
          navigate('/'); // Chuyển hướng sang trang main
        }, 1500); // Đợi 1.5 giây trước khi chuyển hướng
      } else {
        setError(response.data.error || 'Đã xảy ra lỗi!');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Đã xảy ra lỗi không xác định!');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <form className="bg-gray-900 p-6 rounded-lg shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-lg font-bold text-center text-white mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

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
