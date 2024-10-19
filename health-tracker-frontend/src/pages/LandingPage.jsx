import React from 'react';
import './LandingPage.css';
import { FaHeartbeat, FaUserMd } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ onGetStarted }) => {
   const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/register');  // Navigates to the registration page
    };
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1 className="headline">Welcome to Health Tracker</h1>
                <p className="subheadline">Track your health metrics easily and efficiently.</p>
                
                <div className="doctor-animation">
                    <img src="https://res.cloudinary.com/dgnocpiwl/image/upload/v1728296854/undraw_medicine_b-1-ol_tekc58.svg" 
                         alt="Doctor Animation" 
                         className="doctor-image" 
                    />
                </div>

                <div className="features">
                    <div className="feature">
                        <FaHeartbeat className="feature-icon" />
                        <h3>Track Your Health</h3>
                        <p>Log your health data, monitor your progress, and stay fit.</p>
                    </div>

                    <div className="feature">
                        <FaUserMd className="feature-icon" />
                        <h3>Consult with Experts</h3>
                        <p>Get connected with certified doctors for professional advice.</p>
                    </div>
                </div>

                <button className="get-started-btn" onClick={handleGetStarted}>
                    Get Started <AiOutlineArrowRight className="icon" />
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
