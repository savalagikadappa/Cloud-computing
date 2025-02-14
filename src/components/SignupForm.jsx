import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handleSignup = async () => {
    if (!showOtpField) {
      try {
        await axios.post('http://localhost:3000/signup', { email, password });
        console.log("hello")
        setShowOtpField(true);
      } catch (error) {
        alert('Signup failed');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/verify-otp', { email, otp });
        alert(response.data);
      } catch (error) {
        alert('OTP verification failed');
      }
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {showOtpField && (
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      )}
      <button onClick={handleSignup}>
        {showOtpField ? "Verify OTP" : "Signup"}
      </button>
    </div>
  );
};

export default SignupForm;