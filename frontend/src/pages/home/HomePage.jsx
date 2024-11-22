import React, { useState } from 'react';
import './HomePage.css'; // For styling
import recycleImage from '../../assets/images/loginimg1.jpg';  // Import image
import Navbar from '../../components/navbar/Navbar';
import chatbotImage from '../../assets/images/chatbot.png'; // Import chatbot image
import Chatbot from '../chatbot/Chatbox';  // Import your chatbot component (assuming you have it)

const HomePage = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);  // State to track chatbot visibility

    // Function to toggle the chatbot visibility
    const openChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    return (
        <>
            <div className="home-page">
                <header className="hero-section">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Welcome to Smart Waste Management</h1>
                            <p>Your one-stop solution for efficient and sustainable waste management.</p>
                        </div>
                        <div className="hero-image-container">
                            {/* Display the image on the left */}
                            <img src={recycleImage} alt="Smart Waste Management" className="hero-image" />
                        </div>
                    </div>
                </header>
                <section className="features">
                    <h2>Key Features</h2>
                    <div className="feature-card">
                        <h3>Real-time Monitoring</h3>
                        <p>Monitor waste levels and gas concentrations with real-time updates.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Safety Alerts</h3>
                        <p>Receive alerts when gas levels exceed safe thresholds.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Optimized Waste Collection</h3>
                        <p>Smart waste bins notify when they are full for optimized collection routes.</p>
                    </div>
                </section>
            </div>

            {/* Chatbot Icon in the Bottom Right Corner */}
            <div
                className="chatbot-icon"
                onClick={openChatbot}
            >
                <img src={chatbotImage} alt="Chatbot" />
            </div>

            {/* Conditionally render the chatbot component */}
            {isChatbotOpen && (
                <div className="chatbot-window">
                    {/* Your chatbot window or chat interface */}
                    <Chatbot />
                </div>
            )}
        </>
    );
};

export default HomePage;
