import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "../App.css";
import logo from "../assets/logo.jpeg"; // Adjust the path if needed

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>

            {/* Hamburger Button (Only visible on small screens) */}
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "✖" : "☰"}
            </button>

            {/* Navigation Links (Hidden on small screens by default) */}
            <ul className={`links ${menuOpen ? "open" : ""}`}>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link></li>
                <li><Link to="/post-task" onClick={() => setMenuOpen(false)}>Post a Task</Link></li>
                <li><Link to="/freelancer" onClick={() => setMenuOpen(false)}>Join as Freelancer</Link></li>
                <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
                <li>
                    <Link to="/LoginOrSignup" onClick={() => setMenuOpen(false)}>
                        <button>Login/Signup</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
