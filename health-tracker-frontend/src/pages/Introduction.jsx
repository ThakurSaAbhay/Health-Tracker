import React from 'react';
import { Link } from 'react-router-dom';
import './IntroductionPage.css'; // Create a separate CSS file for styling

const IntroductionPage = () => {
    return (
        <div className="introduction-container">
            <div className='containerx'>
            <h1>Welcome to 
                Health Tracker Application</h1>
            <p>
                Our Health Tracker Application is designed to help you monitor and manage your health metrics conveniently. 
                With our intuitive interface, you can log your daily health data and gain insights into your health trends 
                through detailed analyses. Whether you're tracking your weight, blood pressure, cholesterol levels, or other 
                vital signs, our application provides you with the tools you need to stay informed about your health.
            </p></div>
            <div className="card-container">
                <Link to="/healthDataLogging" className="cards">
                    <i className="fas fa-clipboard-list"></i>
                    <h2>Log Health Data</h2>
                    <p>Easily input and track your daily health metrics.</p>
                </Link>
                <Link to="/healthDataAnalysis" className="cards">
                    <i className="fas fa-chart-line"></i>
                    <h2>Analyze Health Data</h2>
                    <p>Gain insights and track trends in your health data.</p>
                </Link>
                <Link to="/healthDataHistory" className="cards">
                    <i className="fas fa-history"></i>
                    <h2>Health Data History</h2>
                    <p>View and track your health data over time.</p>
                </Link>
            </div>
        </div>
    );
};

export default IntroductionPage;
