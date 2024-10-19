import React, { useState, useEffect, useCallback } from 'react';
import './HealthDataLogging.css';

const HealthDataLogging = ({ onGoBack }) => {
    const [userId, setUserId] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [bloodSugar, setBloodSugar] = useState('');
    const [oxygenSaturation, setOxygenSaturation] = useState('');
    const [message, setMessage] = useState('');
    const [healthDataList, setHealthDataList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [flip, setFlip] = useState(false); 
    const [bmi, setBmi] = useState(null);

    const fetchHealthData = useCallback(async () => {
        try {
            if (userId) {
                const response = await fetch(`https://lucky-happiness-production.up.railway.app/healthdata/${userId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch health data');
                }
    
                const data = await response.json();
    
                if (data) {
                    setHealthDataList(data);
                } else {
                    setHealthDataList([]);
                }
            }
        } catch (error) {
            console.error("Error fetching health data:", error);
            setHealthDataList([]);
            setMessage("Error fetching health data.");
        }
    }, [userId]); // Added userId as a dependency

    useEffect(() => {
        fetchHealthData();
    }, [fetchHealthData]); // Use fetchHealthData as a dependency

    const isValidBloodPressure = (bp) => /^\d{2,3}\/\d{2,3}$/.test(bp);
    const isPositiveNumber = (num) => num > 0;
    const calculateBMI = (weight, height) => {
        if (weight > 0 && height > 0) {
            return (weight / (height * height)).toFixed(2); // BMI formula
        }
        return null;
    };
        
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPositiveNumber(weight) || !isPositiveNumber(height) || !isValidBloodPressure(bloodPressure) || 
            !isPositiveNumber(cholesterol) || !isPositiveNumber(bloodSugar) || !isPositiveNumber(oxygenSaturation)) {
            setMessage('Please enter valid health data.');
            return;
        }

        const calculatedBMI = calculateBMI(weight, height);
        setBmi(calculatedBMI);
        
        const healthData = {
            userId: parseInt(userId),
            weight: parseFloat(weight),
            height: parseFloat(height),
            bloodPressure,
            bmi: parseFloat(calculatedBMI), // Use calculatedBMI directly
            heartRate: parseInt(heartRate),
            cholesterol: parseFloat(cholesterol),
            bloodSugar: parseFloat(bloodSugar),
            oxygenSaturation: parseFloat(oxygenSaturation),
        };

        if (editMode && editId) {
            const response = await fetch(`https://lucky-happiness-production.up.railway.app/healthdata/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(healthData),
            });

            if (response.ok) {
                setMessage('Health data updated successfully!');
                resetForm();
                fetchHealthData();
            } else {
                setMessage('Failed to update health data.');
            }
        } else {
            const response = await fetch('https://lucky-happiness-production.up.railway.app/healthdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(healthData),
            });

            if (response.ok) {
                setMessage('Health data logged successfully!');
                resetForm();
                fetchHealthData();
            } else {
                setMessage('Failed to log health data.');
            }
        }
    };

    const resetForm = () => {
        setUserId('');
        setWeight('');
        setHeight('');
        setBloodPressure('');
        setHeartRate('');
        setCholesterol('');
        setBloodSugar('');
        setOxygenSaturation('');
        setEditMode(false);
        setEditId(null);
        setBmi(null); // Reset BMI on form reset
    };

    const handleDelete = async (id) => {
        const response = await fetch(`https://lucky-happiness-production.up.railway.app/healthdata/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setMessage('Health data deleted successfully!');
            fetchHealthData();
        }
    };

    const handleUpdate = (data) => {
        setUserId(data.userId);
        setWeight(data.weight);
        setHeight(data.height);
        setBloodPressure(data.bloodPressure);
        setHeartRate(data.heartRate);
        setCholesterol(data.cholesterol);
        setBloodSugar(data.bloodSugar);
        setOxygenSaturation(data.oxygenSaturation);
        setEditMode(true);
        setEditId(data.id);
        setFlip(false); 
    };

    return (
        <div className="card-container">
            <div className={`card ${flip ? 'flip' : ''}`}>
                <div className="card-side card-front">
                    <h2>{editMode ? 'Update Health Data' : 'Log Health Data'}</h2>
                    <form onSubmit={handleSubmit} className="form-grid">
                        <input
                            type="number"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            disabled={editMode}
                        />
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Height (m)"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Blood Pressure (e.g. 120/80)"
                            value={bloodPressure}
                            onChange={(e) => setBloodPressure(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Heart Rate (bpm)"
                            value={heartRate}
                            onChange={(e) => setHeartRate(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Cholesterol (mg/dL)"
                            value={cholesterol}
                            onChange={(e) => setCholesterol(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Blood Sugar (mg/dL)"
                            value={bloodSugar}
                            onChange={(e) => setBloodSugar(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Oxygen Saturation (%)"
                            value={oxygenSaturation}
                            onChange={(e) => setOxygenSaturation(e.target.value)}
                            required
                        />
                        <button type="submit">
                            {editMode ? 'Update Data' : 'Log Data'}
                        </button>
                    </form>
                    <button className={"show-button"} onClick={() => setFlip(true)}>View Logged Data</button>
                    {message && <p>{message}</p>}
                    {bmi && <p>Your BMI: {bmi}</p>}
                </div>

                <div className="card-side card-back">
                    <h2>Logged Health Data</h2>
                    {healthDataList.length === 0 ? (
                        <p>No health data available.</p>
                    ) : (
                        <ul>
                            {healthDataList.map((data) => (
                                <li key={data.id}>
                                    <strong>User ID:</strong> {data.userId}, 
                                    <strong>Weight:</strong> {data.weight}, 
                                    <strong>Height:</strong> {data.height}, 
                                    <strong>Blood Pressure:</strong> {data.bloodPressure}, 
                                    <strong>Heart Rate:</strong> {data.heartRate}, 
                                    <strong>Cholesterol:</strong> {data.cholesterol}, 
                                    <strong>Blood Sugar:</strong> {data.bloodSugar}, 
                                    <strong>Oxygen Saturation:</strong> {data.oxygenSaturation}
                                    <button className="update-btn" onClick={() => handleUpdate(data)}>Update</button>
                                    <button className="delete-btn" onClick={() => handleDelete(data.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={() => setFlip(false)}>Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default HealthDataLogging;
