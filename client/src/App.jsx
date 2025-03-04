import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import NavBar from "./components/Navbar.jsx";
import LoginOrSignup from "./components/LoginOrSignup.jsx";
import PostTask from "./components/PostTask.jsx";
import Freelancer from "./components/Freelancer.jsx";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import './styles/global.css';

const App = () => {
  const location = useLocation();
  const hideNavBarPaths = ["/login"];

  return (
    <AuthProvider>

      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <main> {/* Wrap Routes in a main element */}
        <Routes>
          <Route path="/login" element={<LoginOrSignup />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-task" element={<PostTask />} />
          <Route path="/freelancer" element={<Freelancer />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </AuthProvider>
  );
};

export default App;