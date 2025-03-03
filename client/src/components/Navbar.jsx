import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext
import "../styles/navbar.css";
import logo from "../assets/logo.jpeg";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, logout, user } = useContext(AuthContext); // Use context

    const handleLogout = () => {
        logout(); // Call logout from context
        setMenuOpen(false); // Close menu
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "✖" : "☰"}
            </button>

            <ul className={`links ${menuOpen ? "open" : ""}`}>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/post-task" onClick={() => setMenuOpen(false)}>Post a Task</Link></li>
                <li><Link to="/freelancer" onClick={() => setMenuOpen(false)}>Join as Freelancer</Link></li>
                <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
                <li>
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                            <button>Login/Signup</button>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;