import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext
import "../styles/home.css";

const Home = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Redirects to /login via AuthContext
  };

  return (
    <div className="home">
      {isLoggedIn ? (
        <>
          <h1>Welcome , {user?.email || "User"}!</h1>
          <h2>Get Your Tasks Done Instantly with SkillFlash!</h2>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </>
      ) : (
        <>
          <h1>Welcome to SkillFlash</h1>
          <h2>Get Your Tasks Done Instantly with SkillFlash!</h2>
          <p>Get started by logging in or signing up!</p>
          <button onClick={() => navigate("/login")}>Login/Signup</button>
        </>
      )}
      <br />
      <h1>Services offered</h1>
    </div>
  );
};

export default Home;