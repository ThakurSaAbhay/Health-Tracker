import React, { useState } from 'react';
import './UserRegistration.css';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');  // Navigates to the registration page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const userData = { email, name, password };

        try {
            const response = await fetch('https://lucky-happiness-production.up.railway.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // Check if the request was successful
            if (response.ok) {
                setMessage('User registered successfully!');
                handleGetStarted(); // Call the parent handler to notify registration
                setEmail('');
                setName('');
                setPassword('');
                setConfirmPassword('');
            } else {
                // Get the response text (error message) from the backend
                const errorText = await response.text();
                setMessage(errorText);  // Display error message from the server (like "Email already in use")
            }
        } catch (error) {
            setMessage('Failed to register user.');
        }
    };

    return (
        <div className="container">
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <h6 className="login-link" onClick={handleGetStarted} style={{ cursor: 'pointer', marginTop: '10px', color: '#00ffff' }}>
                Already registered? Log In
            </h6>
        </div>
    );
};

export default UserRegistration;
