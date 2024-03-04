
import React, { useState, useEffect } from 'react';
import { DataExtraction } from '../data.js'; // Import DataExtraction function

import './App.css'
import HomeScreen from './components/HomeScreen'
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
    <HomeScreen></HomeScreen>
    </>
  )
}

export default App

