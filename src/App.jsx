import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomeScreen from './components/HomeScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Schedule from './components/Schedule';
import Map from './components/Map';
import Navigation from './components/Navigation';
import Timings from './components/Timings';
import Login from './components/Login';
import GMaps from './components/GMaps';
import RouteSearch from './components/RouteSearch';
// Step 3: Create a context
const DataContext = createContext(null);

function App() {
  const [apiData, setApiData] = useState(() => {
    // Step 2: Retrieve data from local storage, or set it to null if not found
    const storedData = localStorage.getItem('apiData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [busRoutes, setBusRoutes] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (!apiData) {
      fetchApiData();
    }
    if (!busRoutes) {
      fetchBusRoutes();
    }
  }, []);

  const fetchApiData = () => {
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('apiData', JSON.stringify(data));
        setApiData(data);
        setBusRoutes(data.busRoutes);
        setLoading(false); // Set loading to false once busRoutes is available
      })
      .catch(error => console.error('Error fetching API data:', error));
  };

  const fetchBusRoutes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/data');
      const { busRoutes } = await response.json();
      setBusRoutes(busRoutes);
      setLoading(false); // Set loading to false once busRoutes is available
    } catch (error) {
      console.error('Error fetching bus routes:', error);
    }
  };

  const mapboxApiKey = import.meta.env.VITE_MAPBOX_APIKEY;

  if (loading) {
    // Render a loading state until data is fetched
    return <div>Loading...</div>;
  }

  // Step 4: Wrap your application with the context provider
  return (
    <DataContext.Provider value={{ apiData, busRoutes,mapboxApiKey }}>
      <Router>
        <div className='app-container'>
          <Navbar/>
          <div className='content'>
            <Routes>
              <Route exact path="/" element={<HomeScreen/>} />
              <Route exact path="/schedule" element={<Schedule/>} />
              <Route exact path="/track" element={<Map/>} />
              <Route exact path="/timings" element={<Timings/>} />
              <Route exact path='/login' element={<Login/>}></Route>
              <Route exact path='/maps' element={<GMaps/>}></Route>
              <Route exact path='/search' element={<RouteSearch/>}></Route>
            </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
    </DataContext.Provider>
  );
}
export { DataContext, App as default };