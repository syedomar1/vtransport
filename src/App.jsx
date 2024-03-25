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

// Step 3: Create a context
const DataContext = createContext(null);

function App() {
  const [data, setData] = useState(() => {
    // Step 2: Retrieve data from local storage, or set it to null if not found
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => {
        // Step 1: Cache fetched data in local storage
        localStorage.setItem('data', JSON.stringify(data));
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Step 4: Wrap your application with the context provider
  return (
    <DataContext.Provider value={data}>
      <Router>
        <div className='bg-slate-900'>
          <Navbar/>
        </div>
        <div className='content' style={{ overflow: 'auto', minHeight: 'calc(100vh - 80px)', marginTop: '80px' }}>
          <Routes>
            <Route exact path="/" element={<HomeScreen/>} />
            <Route exact path="/schedule" element={<Schedule/>} />
            <Route exact path="/track" element={<Map/>} />
            <Route exact path="/timings" element={<Timings/>} />
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/maps' element={<GMaps/>}></Route>
          </Routes>
          <Footer/>
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export { DataContext, App as default };
