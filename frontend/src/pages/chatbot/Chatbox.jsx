import React, { useState } from 'react';
import './Chatbot.css'; // Add your chatbot styling

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { user: 'bot', text: 'Hello! How can I assist you with smart waste management today?' }
    ]);
    const [userInput, setUserInput] = useState('');

    // Handle user input and display bot response
    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (userInput.trim()) {
            // Add user message
            const newMessages = [...messages, { user: 'user', text: userInput }];

            // Get chatbot response (simplified logic)
            let botResponse = getBotResponse(userInput);

            // Add bot response
            newMessages.push({ user: 'bot', text: botResponse });

            // Update messages state
            setMessages(newMessages);
            setUserInput(''); // Clear user input
        }
    };

    // Function to get dynamic responses based on user input
    const getBotResponse = (input) => {
        const normalizedInput = input.toLowerCase();

        if (normalizedInput.includes('waste level') || normalizedInput.includes('current waste level')) {
            return 'The waste level is being monitored in real-time to optimize collection schedules.';
        }
        if (normalizedInput.includes('safety') || normalizedInput.includes('dangerous gas')) {
            return 'If dangerous gases are detected, you will receive an alert, and the bin will be marked for inspection.';
        }
        if (normalizedInput.includes('smart bin')) {
            return 'Smart bins notify the system when they are full, ensuring optimized collection routes for waste management.';
        }
        if (normalizedInput.includes('waste collection') || normalizedInput.includes('collection schedule')) {
            return 'Waste collection is optimized based on real-time bin data. The system schedules pickups based on bin fullness.';
        }
        if (normalizedInput.includes('how does it work') || normalizedInput.includes('explain')) {
            return 'Our smart waste management system uses IoT sensors to monitor waste levels and detect gases. It alerts when bins are full or unsafe, optimizing waste collection.';
        }
        if (normalizedInput.includes('thank you') || normalizedInput.includes('thanks')) {
            return 'You\'re welcome! Let me know if you need more information.';
        }

        return 'I am sorry, I don’t understand that. Can you please rephrase?';
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h4>Smart Waste Management Bot</h4>
            </div>
            <div className="chatbot-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`chatbot-message ${message.user}`}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    placeholder="Ask a question..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
