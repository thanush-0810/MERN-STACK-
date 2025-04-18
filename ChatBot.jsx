import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const predefinedQueries = [
    { id: 1, text: "How do I submit a grievance?" },
    { id: 2, text: "What are the different priority levels?" },
    { id: 3, text: "How long does it take to process a grievance?" },
    { id: 4, text: "How can I track my grievance status?" },
    { id: 5, text: "What documents should I attach?" },
    { id: 6, text: "How to contact department administrators?" }
];

const predefinedAnswers = {
    1: "To submit a grievance:\n1. Log in to your account\n2. Click on 'File Grievance'\n3. Fill in the required details\n4. Select priority level\n5. Attach supporting documents (if any)\n6. Submit the form",
    2: "There are three priority levels:\n• Compulsory - Urgent issues requiring immediate attention\n• Necessary - Important issues that need resolution soon\n• Suggested - General improvements or suggestions",
    3: "Processing time varies by priority:\n• Compulsory: 1-2 working days\n• Necessary: 3-5 working days\n• Suggested: 7-10 working days",
    4: "To track your grievance:\n1. Log in to your account\n2. Go to 'Grievance Status'\n3. View all your submitted grievances and their current status",
    5: "Recommended documents:\n• Relevant screenshots or photos\n• Official communications\n• Any supporting evidence\nNote: Max file size is 10MB",
    6: "Contact administrators:\n• Email: mail@ritchennai.edu.in\n• Phone: 044 6718 1600\n• Visit: Administrative Office (9 AM - 5 PM)"
};

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { 
            text: "Hello! I'm your RIT Assistant. Please select a question from below:", 
            type: 'bot' 
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleQuerySelect = async (query) => {
        if (isLoading) return;

        setIsLoading(true);
        setMessages(prev => [...prev, { text: query.text, type: 'user' }]);

        // Simulate response delay
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                text: predefinedAnswers[query.id], 
                type: 'bot' 
            }]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="chatbot-page">
            <div className="chatbot-container">
                <div className="chatbot-header">
                    <h2>RIT Assistant</h2>
                    <p>Select a question to get instant help</p>
                </div>
                <div className="chatbot-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <div className="message-content">
                                {message.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message bot">
                            <div className="message-content loading">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="query-buttons">
                    {predefinedQueries.map(query => (
                        <button
                            key={query.id}
                            onClick={() => handleQuerySelect(query)}
                            disabled={isLoading}
                            className="query-button"
                        >
                            {query.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;