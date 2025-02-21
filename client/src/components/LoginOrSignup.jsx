import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { AuthContext } from './AuthContext';
import '../styles/login.css'; // Assuming this exists

const LoginOrSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home'); // Redirect if already logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={`container ${isLogin ? 'login-mode' : 'signup-mode'}`}>
      <div className="button-group" style={{ marginBottom: '20px' }}>
        <button onClick={() => setIsLogin(true)} disabled={isLogin}>
          Login
        </button>
        <button onClick={() => setIsLogin(false)} disabled={!isLogin}>
          Signup
        </button>
      </div>
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default LoginOrSignup;