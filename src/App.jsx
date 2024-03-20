
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
  return (
    <>
        <Router>
        <div className='bg-slate-900'>
          <Navbar/>
        </div>
        <div className='content' style={{ overflow: 'auto', minHeight: 'calc(100vh - 80px)' }}>
            <Routes>
              <Route exact path="/" element={<HomeScreen/>} />
              <Route exact path="/schedule" element={<Schedule/>} />
              <Route exact path="/track" element={<Map/>} />
              <Route exact path="/timings" element={<Timings/>} />
            </Routes>
            {/* <Navigation/> */}
            <Footer/>
          </div>
        </Router>
    </>
  );
}

export default App

