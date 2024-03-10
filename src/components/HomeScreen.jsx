import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import OverlayStyle from './OverlayStyle';
import TitleCard from './TitleCard';

export default function HomeScreen() {
    const [routesData, setRoutesData] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/routesData');
            if (response.ok) {
                const data = await response.json();
                setRoutesData(data);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Update loading state
        }
    };

    return (
        <>
            <OverlayStyle>
                {/* Render your JSON data here */}
                {loading ? (
                    <div>Loading...</div> // Render loading indicator
                ) : (
                    <div>
                        <h1>Bus Routes Data</h1>
                        <ul>
                            {routesData.map(route => (
                                <li key={route['SL.NO.']}>
                                    <h2>{route['BUS ROUTE NO']}</h2>
                                    <ul>
                                        {route.stops.map(stop => (
                                            <li key={stop['SL.NO.']}>
                                                <p>Stop: {stop['NAME OF THE STOPPING']}</p>
                                                <p>Time: {stop['TIME A.M']}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </OverlayStyle>
        </>
    );
}
