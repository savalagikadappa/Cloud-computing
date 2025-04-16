import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const apiUrl = "http://13.127.231.31:3000";
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token } = response.data; // Assuming backend returns { token: "..." }
      login(token, { email }); // Update context and redirect
      setLoading(false); // Ensure loading is reset on success
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
