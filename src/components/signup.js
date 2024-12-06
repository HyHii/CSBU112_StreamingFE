import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Email:', email, 'Password:', password);
    // Thêm logic xử lý đăng ký ở đây
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <form className="bg-gray-900 p-6 rounded-lg shadow-md w-80" onSubmit={handleSignUp}>
        <h2 className="text-lg font-bold text-center text-white mb-4">Sign Up</h2>
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
