import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/register');  // Navigates to the registration page
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
    
        

        const loginData = { email, password };

        try {
            const response = await fetch('https://lucky-happiness-production.up.railway.app/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Login successful!');
                onLogin(result); 
                setEmail('');
                setPassword('');
            } else {
                setMessage('Invalid email or password.');
            }
        } catch (error) {
            setMessage('An error occurred during login.'+error.message);
        }
    };

    return (
        <div className="container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                
            </form>
            {message && <p>{message}</p>}
            <h6 className="login-link" onClick={handleGetStarted} style={{ cursor: 'pointer', marginTop: '10px', color: '#00ffff' }}>
                Not registered? Sign Up.
            </h6>
        </div>
    );
};

export default Login;
