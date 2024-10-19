import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const HealthDataAnalysis = () => {
    const [userId, setUserId] = useState('');
    const [healthData, setHealthData] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState(null);

    const fetchHealthData = async () => {
        try {
            const response = await axios.get(`https://lucky-happiness-production.up.railway.app/healthdata/${userId}`);
            setHealthData(response.data);
        } catch (err) {
            setError('Error fetching health data');
        }
    };

    const analyzeHealthData = useCallback(async () => {
        if (healthData) {
            try {
                const response = await axios.post('https://lucky-happiness-production.up.railway.app/healthdata/analysis', healthData[0]);
                setAnalysisData(response.data);
            } catch (err) {
                setError('Error fetching analysis data');
            }
        }
    }, [healthData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchHealthData();
    };
    
    useEffect(() => {
        analyzeHealthData();
    }, [analyzeHealthData]);

    return (
        <div className="analysis-container">
            <h2>Health Data Analysis</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userId">Enter User ID:</label>
                <input
                    type="number"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <button type="submit">Fetch Health Data</button>
            </form>
            {error && <p className="error">{error}</p>}
            {analysisData ? (
                <div className="analysis-results">
                    <h3>BMI: {analysisData.bmi.toFixed(2)}</h3>
                    <p>BMI Classification: {analysisData.bmiClassification}</p>
                    <p>Blood Pressure Status: {analysisData.bloodPressureStatus}</p>
                    <p>Heart Rate Status: {analysisData.heartRateStatus}</p>
                    <p>Cholesterol Status: {analysisData.cholesterolStatus}</p>
                    <p>Blood Sugar Status: {analysisData.bloodSugarStatus}</p>
                    <p>Oxygen Status: {analysisData.oxygenStatus}</p>
                </div>
            ) : (
                <p>Loading analysis data...</p>
            )}
        </div> 
    );
};

export default HealthDataAnalysis;
