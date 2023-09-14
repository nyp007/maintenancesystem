// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        'https://localhost:7068/api/TechnicianInfo', // Replace with your API endpoint
        {
          params: {
            email: formData.email,
            password: formData.password,
          },
        }
      );

      // Check if the response contains a valid user
      const user = response.data.find((user) => user.email === formData.email && user.password === formData.password);

      if (user) {
        // Successful login, handle your logic here
        console.log('Login successful:', user);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
