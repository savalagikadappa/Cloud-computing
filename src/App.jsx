import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import LoginOrSignup from "./components/LoginOrSignup.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import PostTask from "./components/PostTask.jsx";
import Freelancer from "./components/Freelancer.jsx";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import './App.css'

const App = () => {
  const location = useLocation();
  // Specify routes where the NavBar should be hidden
  const hideNavBarPaths = ["/LoginOrSignup"];

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/LoginOrSignup" element={<LoginOrSignup />} />
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/post-task" element={<PostTask />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;