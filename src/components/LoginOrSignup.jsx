import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from 'react';
import '../App.css';

function LoginOrSignup() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <div className={`container ${isLogin ? 'login-mode' : 'signup-mode'}`}>
                <div className='button-group'>
                    <button onClick={() => setIsLogin(true)}>Login</button>
                    <button onClick={() => setIsLogin(false)}>Signup</button>
                </div>
                {isLogin ? <LoginForm /> : <SignupForm />}
            </div>
        </>
    )
}

export default LoginOrSignup;