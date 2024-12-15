import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Kiểm tra password có khớp nhau không
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Gửi request đăng ký
      const response = await axios.post('https://marmoset-unbiased-logically.ngrok-free.app/api/account/register', {
        name: username,
        password: password,
      });

      // Xử lý phản hồi từ server
      if (response.status === 200 || response.data.success) {
        setSuccessMessage('Account registered successfully!');
        setError(null);
      } else {
        setError(response.data.error || 'Failed to register');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error! Please try again later.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <form
        className="bg-gray-900 p-6 rounded-lg shadow-md w-80"
        onSubmit={handleSignUp}
      >
        <h2 className="text-lg font-bold text-center text-white mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-300">Username:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 text-black rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <label className="block mb-2 text-sm font-medium text-gray-300">Confirm Password:</label>
        <input
          type="password"
          className="w-full p-2 mb-4 text-black rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
