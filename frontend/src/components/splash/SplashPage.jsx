import React from 'react';
import './SplashPage.css';
import recycleImage from '../../assets/images/swmsimg.avif'; // Path to your image

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <img src={recycleImage} alt="Smart Waste Management" className="splash-image" />
            <h1>Smart Waste Management System</h1>
            <p>Loading...</p>
        </div>
    );
};

export default SplashScreen;
