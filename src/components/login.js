// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({ idNumber: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that both fields are filled
    if (!loginData.idNumber || !loginData.password) {
      setError('Please fill in all fields.');
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) =>
        user.idNumber === loginData.idNumber && user.password === loginData.password
    );

    if (user) {
      localStorage.setItem('loggedInIdNumber', user.idNumber); // Save logged-in user ID
      navigate('components/home');
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('components/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={loginData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <button onClick={handleRegisterRedirect}>Go to Register</button>
    </div>
  );
};

export default Login;
