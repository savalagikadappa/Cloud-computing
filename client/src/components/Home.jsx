import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "../styles/home.css";

const Home = () => {
  const steps = [
    { title: "Post Your Task", desc: "Describe your job and set a budget", icon: "➡" },
    { title: "Instant Match", desc: "SkillFlash assigns the best freelancer", icon: "⭐" },
    { title: "Work Gets Done", desc: "Freelancer completes and submits the work", icon: "⏳" },
    { title: "Approve & Pay", desc: "Review, approve, and payment is released", icon: "🛡" }
  ];
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const gotoFreelance = () => {
    if (isLoggedIn)
      navigate("/freelancer");
    else
      navigate("/login")
  }
  const postTask = () => {
    if (isLoggedIn) navigate("/post-task");
    else navigate("/login");
  }
  return (

    <div className="home">
      <div className="userstatus fade-in">
        {isLoggedIn ? (
          <>
            <h2 style={{ textAlign: "center", width: "100%" }}>Welcome to SkillFlash</h2>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: "center", width: "100%" }}>Welcome to SkillFlash</h2>
            <p>Get started by logging in or signing up!</p>
            <button id="log" onClick={() => navigate("/login")}>Login/Signup</button>
          </>
        )}
      </div>

      <br />

      <div className="intro fade-in">
        <h1 style={{ textAlign: "center", width: "100%" }}>Get Work Done Instantly</h1>
        <h2>Post a task, get matched instantly, and receive high-quality work – fast and hassle-free.</h2>
        <br />
        <button id="post" onClick={postTask}>Post a Task now</button>
        <button id="freelance" onClick={gotoFreelance}>Earn as a freelancer</button>
      </div>

      <br />

      <div className="how-it-works fade-in">
        <h2>How It Works</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step-card fade-in" key={index}>
              <div className="icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>


  );
};

export default Home;