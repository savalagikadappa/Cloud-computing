import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const apiUrl = process.env.REACT_APP_API_URL; // e.g., "https://your-backend-domain.com"

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!showOtpField) {
      // Step 1: Request OTP
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      try {
        await axios.post(`${apiUrl}/signup`, { email, password });
        setMessage('OTP sent to your email');
        setShowOtpField(true);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'Signup failed');
        setLoading(false);
      }
    } else {
      // Step 2: Verify OTP
      if (!otp) {
        setError('Please enter the OTP');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${apiUrl}/verify-otp`, { email, otp });
        const { token } = response.data; // Assuming backend returns { token: "..." }
        login(token, { email }); // Update context and redirect
        setLoading(false); // Reset loading on success
      } catch (error) {
        setError(error.response?.data?.error || 'OTP verification failed');
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || showOtpField}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading || showOtpField}
      />
      {showOtpField && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={loading}
        />
      )}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Signup'}
      </button>
    </form>
  );
};

export default SignupForm;