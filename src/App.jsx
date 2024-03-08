
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataExtraction } from '../data.js';
import './App.css'
import HomeScreen from './components/HomeScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
            </Routes>
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

