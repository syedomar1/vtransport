import React, { useState, useEffect } from 'react';
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

function App() {
  const [data, setData] = useState(null); // Initialize data state as null

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => setData(data)) // Set the received data to state
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <>
            <Router>
            <div className='bg-slate-900'>
               <Navbar/>
            </div>
            <div className='content' style={{ overflow: 'auto', minHeight: 'calc(100vh - 80px)',marginTop:'80px' }}>
              <Routes>
                <Route exact path="/" element={<HomeScreen/>} />
                <Route exact path="/schedule" element={<Schedule busdata={data}/>} />
                <Route exact path="/track" element={<Map/>} />
                <Route exact path="/timings" element={<Timings/>} />
                <Route exact path='/login' element={<Login></Login>}></Route>
              </Routes>
                 {/* <Navigation/> */}
             <Footer/>
               </div>
             </Router>
         </>
  );
}

export default App;

