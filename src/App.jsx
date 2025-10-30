import { useState } from 'react';
import axios from './configs/axios.js';

export default function App() {
  const [inputValue, setInputValue] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSummit = async () => {
    try {
      const result = await axios.post('http://localhost:8888/api/auth/login', {
        email: inputValue.username,
        password: inputValue.password
        //   email: 'pakinporing@gmail.com',
        //   password: '123456'
      });
      const token = result.data.accessToken;

      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async (event) => {
    try {
      await axios.post('auth/register', {
        email: 'pakinpor3@gmail.com',
        password: '123456'
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const test = async () => {
    try {
      const res = await axios.get('http://localhost:8888/test-auth');
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        alert('Token expired, please login again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Login Page</h1>
        <input
          onChange={handleChange}
          value={inputValue?.username}
          name="username"
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={handleChange}
          value={inputValue?.password}
          name="password"
          type="password"
          placeholder="Password"
          className="w-full  mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSummit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-2"
        >
          Login
        </button>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-2"
        >
          mock register
        </button>

        <button
          onClick={test}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-2"
        >
          test การใช้งาน token
        </button>
      </div>
    </div>
  );
}
