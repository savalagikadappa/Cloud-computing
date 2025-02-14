import { useState } from 'react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm';
import './App.css'

function App() {
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


export default App
