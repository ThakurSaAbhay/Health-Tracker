import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HealthDataLogging from './pages/HealthDataLogging';
import UserRegistration from './pages/UserRegistration';
import Login from './pages/Login';
import './styles/App.css';
import HealthDataAnalysis from './pages/HealthDataAnalysis';
import IntroductionPage from './pages/Introduction';
import HealthDataHistory from './pages/HealthDataHistory';
import HealthTrends from './pages/HealthTrends';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/register"
                        element={isLoggedIn ? <Navigate to="/healthdata" /> : <UserRegistration />}
                    />
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to="/introduction" /> : <Login onLogin={handleLogin} />}
                    />
                    <Route
                        path="/healthdata"
                        element={isLoggedIn ? <HealthDataLogging /> : <Navigate to="/login" />}
                    />
                     <Route
                        path="/introduction"
                        element={isLoggedIn ? <IntroductionPage/> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/healthDataLogging"
                        element={<HealthDataLogging/>}
                    />
                    <Route
                        path="/healthDataAnalysis"
                        element={<HealthDataAnalysis/>}
                    />
                    <Route
                        path="/healthDataHistory"
                        element={<HealthDataHistory/>}
                    />
                    <Route path="/healthTrends/:userId"  element={<HealthTrends/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
