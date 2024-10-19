import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import "./HealthTrends.css";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const HealthTrends = () => {
    const { userId } = useParams();
    const [healthData, setHealthData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                const response = await axios.get(`https://lucky-happiness-production.up.railway.app/healthdata/history/${userId}`);
                setHealthData(response.data);
            } catch (err) {
                setError('Error fetching health data');
            }
        };

        if (userId) {
            fetchHealthData();
        }
    }, [userId]);

    const prepareChartData = (metric) => {
        const labels = healthData.map(data => new Date(data.timestamp).toLocaleDateString());
        const values = healthData.map(data => data[metric]);
        
        return {
            labels,
            datasets: [
                {
                    label: metric.charAt(0).toUpperCase() + metric.slice(1),
                    data: values,
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                },
            ],
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: 'white', // X-axis label color
                            font: {
                                size: 12,  // Adjust font size if necessary
                            },
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)', // Lighter grid lines for visibility
                        },
                        title: {
                            display: true,
                            text: 'Date',
                            color: 'white', // X-axis title color
                        },
                    },
                    y: {
                        ticks: {
                            color: 'white', // Y-axis label color
                            font: {
                                size: 12,  // Adjust font size if necessary
                            },
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)', // Lighter grid lines for visibility
                        },
                        title: {
                            display: true,
                            text: 'Value',
                            color: 'white', // Y-axis title color
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white', // Legend label color
                        },
                    },
                },
            }
        };
    };
    
    

    return (
        <div className="trends-container">
            <h2>Health Trends</h2>
            {error && <p className="error">{error}</p>}
            <div className="graphs">
                <div className="graph">
                    <h3>Weight</h3>
                    <Line data={prepareChartData('weight')} />
                </div>
                <div className="graph">
                    <h3>Height</h3>
                    <Line data={prepareChartData('height')} />
                </div>
                <div className="graph">
                    <h3>Oxygen Saturation</h3>
                    <Line data={prepareChartData('oxygenSaturation')} />
                </div>
                <div className="graph">
                    <h3>Heart Rate</h3>
                    <Line data={prepareChartData('heartRate')} />
                </div>
                <div className="graph">
                    <h3>Cholesterol</h3>
                    <Line data={prepareChartData('cholesterol')} />
                </div>
                <div className="graph">
                    <h3>Blood Sugar</h3>
                    <Line data={prepareChartData('bloodSugar')} />
                </div>
            </div>
        </div>
    );
};

export default HealthTrends;
