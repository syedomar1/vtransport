import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ScheduleStyle from './ScheduleStyle';
import busRoutesData from '../../data_routes/routes_data.json';

export default function Schedule() {
  // Initialize selectedRoute with the first route name
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTiming, setSelectedTiming] = useState(''); // Set default value to 'MORNING'

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedTiming('');
  };

  const handleStoppingChange = (event) => {
    setSelectedTiming(event.target.value);
  };

  return (
    <div style={{overflow:'auto'}}>
    <ScheduleStyle></ScheduleStyle>
    <div style={{
      position: 'absolute',
      top: '30%',
      left: '10%',
      height: '70vh',
      width: '80vw',
      borderRadius: '20px',
      backgroundColor: '#71b1eb',
    }}>
      
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '2rem',
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            id="outlined-select-bus-route"
            select
            label="Select Bus Number"
            value={selectedRoute}
            onChange={handleRouteChange}
            fullWidth
            sx={{
              mr: 2, // Add margin right
              width: '25vw', // Set width to 300px
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Set border color to white
                  borderWidth: '2px', // Increase border width
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Set border color on hover to white
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Set border color when focused to white
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Set label text color to white
              },
            }}
            SelectProps={{
              MenuProps: {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                sx: { maxHeight: "400px" },
                sy: { maxWidth: '25vw' },
              },
            }}
            InputProps={{
              style: { textAlign: 'center', color: 'white' },
            }}
          >
            {Object.keys(busRoutesData).map((routeName) => (
              <MenuItem key={routeName} value={routeName}>
                {routeName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-stoppings"
            select
            label="Timing"
            value={selectedTiming}
            onChange={handleStoppingChange}
            fullWidth
            sx={{
              width: '25vw', // Set width to 300px
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Set border color to white
                  borderWidth: '2px', // Increase border width
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Set border color on hover to white
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Set border color when focused to white
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Set label text color to white
              },
            }}
            InputProps={{
              style: { textAlign: 'center', color: 'white' },
            }}
          >
            {['MORNING', '1:45 PM', '5:00 PM', '6:00 PM'].map((timing, index) => (
              <MenuItem key={index} value={timing}>
                {timing}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <hr style={{ width: '68%', margin: '3% 0' , left:'10%' }} /> {/* Horizontal line */}
      </Box>
      <h1 className='text-5xl'>Hi</h1>
      <h1 className='text-5xl'>Hi</h1>
      <h1 className='text-5xl'>Hi</h1>
      <h1 className='text-5xl'>Hi</h1>
      <h1 className='text-5xl'>Hi</h1>
      <h1 className='text-5xl'>Hi</h1>
    </div>
    </div>
  );
}