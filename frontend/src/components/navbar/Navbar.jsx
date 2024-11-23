import React, { useState } from 'react';
import './Navbar.css'; // For styling

import logo from '../../assets/images/swmsimg.avif'; // Import logo image

const Navbar = () => {
    // State to toggle the menu on small screens
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Smart Waste Management Logo" className="logo-img" />
                <h1>Smart Waste Management</h1>
            </div>
            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {/* Navigation Links */}
            <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
