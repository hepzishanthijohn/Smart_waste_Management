// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // For styling

import logo from '../../assets/images/swmsimg.avif'; // Import logo image

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Smart Waste Management Logo" className="logo-img" />
                <h1>Smart Waste Management</h1>
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
