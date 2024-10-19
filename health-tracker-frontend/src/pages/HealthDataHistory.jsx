import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./HealthDataHistory.css"

const HealthDataHistory = () => {
    const [userId, setUserId] = useState('');
    const [healthDataHistory, setHealthDataHistory] = useState([]);
    const [error, setError] = useState(null);

    const fetchHealthDataHistory = async () => {
        try {
            const response = await axios.get(`https://lucky-happiness-production.up.railway.app/healthdata/history/${userId}`);
            setHealthDataHistory(response.data);
        } catch (err) {
            setError('Error fetching health data history');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId) {
            fetchHealthDataHistory();
        }
    };

    return (
        <div className="history-container">
            <h2>Health Data History</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userId">Enter User ID:</label>
                <input
                    type="number"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <button type="submit">Fetch History</button>
            </form>
            {error && <p className="error">{error}</p>}
            {healthDataHistory.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>Height</th>
                            <th>Blood Pressure</th>
                            <th>Heart Rate</th>
                            <th>Cholesterol</th>
                            <th>Blood Sugar</th>
                            <th>Oxygen Saturation</th>
                            <th>BMI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {healthDataHistory.map((data) => (
                            <tr key={data.id}>
                                <td>{new Date(data.timestamp).toLocaleDateString()}</td>
                                <td>{data.weight}</td>
                                <td>{data.height}</td>
                                <td>{data.bloodPressure}</td>
                                <td>{data.heartRate}</td>
                                <td>{data.cholesterol}</td>
                                <td>{data.bloodSugar}</td>
                                <td>{data.oxygenSaturation}</td>
                                <td>{data.bmi}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No health data history available.</p>
            )}
            {userId && ( 
                <Link to={`/healthTrends/${userId}`} className="btn">
                    Visualize Health Trends
                </Link>
            )}
        </div>
    );
};

export default HealthDataHistory;
