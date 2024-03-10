
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { DataExtraction } from '../data.js';
import './App.css'
import HomeScreen from './components/HomeScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Schedule from './components/Schedule';
import Map from './components/Map';
// import Navigation from './components/Navigation';
import Timings from './components/Timings';
function App() {
  // const [routesData, setRoutesData] = useState(null);

  // useEffect(() => {
  //   // Path to your Excel file
  //   const filePath = '../data_routes/bus_timings.xlsx';

  //   // Fetch the data using DataExtraction function
  //   const data = DataExtraction(filePath);

  //   // Set the data in component state
  //   setRoutesData(data);

  //   // Print the data to the console
  //   Object.keys(data).forEach(route => {
  //     console.log(route);
  //   });
  // }, []);

  return (
    <>
        <Router>
        <div className='bg-slate-900'>
          <Navbar/>
        </div>
            <Routes>
              <Route exact path="/" element={<HomeScreen/>} />
              <Route exact path="/schedule" element={<Schedule/>} />
              <Route exact path="/track" element={<Map/>} />
              <Route exact path="/timings" element={<Timings/>} />
            </Routes>
            {/* <Navigation/> */}
            <Footer/>
        </Router>
    </>

    // <div className='bg-slate-900'>
    //   <Navbar/>
    // </div>
    // <HomeScreen></HomeScreen>
  );
}

export default App

