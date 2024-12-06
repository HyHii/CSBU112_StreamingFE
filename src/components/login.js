import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    // Thêm logic xử lý đăng nhập ở đây
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <form className="bg-gray-900 p-6 rounded-lg shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-lg font-bold text-center text-white mb-4">Login</h2>
        <label className="block mb-2 text-sm font-medium text-gray-300">Email:</label>
        <input
          type="email"
          className="w-full p-2 mb-4 text-black rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
