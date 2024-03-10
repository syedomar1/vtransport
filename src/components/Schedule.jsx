import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ScheduleStyle from './ScheduleStyle';
import busRoutesData from '../../data_routes/routes_data.json';
import {  Tabs,  TabsHeader,  TabsBody,  Tab,  TabPanel,} from "@material-tailwind/react";


export default function Schedule() {
  // Initialize selectedRoute with the first route name
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTiming, setSelectedTiming] = useState(''); 

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedTiming('');
  };

  const handleStoppingChange = (event) => {
    setSelectedTiming(event.target.value);
  };

  const getCalendarDates = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      const dateNumber = nextDate.getDate();
      const dayOfWeek = daysOfWeek[nextDate.getDay()];
      const formattedDate = `${dateNumber}${getOrdinalSuffix(dateNumber)} ${dayOfWeek}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  const getOrdinalSuffix = (number) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  const currentValue = getCalendarDates()[0]; 

  const data = getCalendarDates().map(date => ({
    label: date,
    value: date,
    desc: `Routes for ${date} will be added soon`,
  }));

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
    <Tabs id="custom-animation" value="{currentValue}">
    <TabsHeader>
  {data.map(({ label, value }, index) => (
    <Tab
      key={value}
      value={value}
      className={`border border-black-500 border-solid rounded-t-md ${index !== 0 ? 'border-l-0' : ''} hover:bg-blue-${index + 3}00 hover:text-white py-2 px-4 inline-block cursor-pointer transition duration-300`}
      style={{ backgroundColor: `rgb(0, ${index * 20 + 80}, ${index * 20 + 180})` }} // Assign different shades of blue for each tab
    >
      {label}
    </Tab>
  ))}
</TabsHeader>


          <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
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
                mr: 2,
                width: '25vw',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
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
                width: '25vw',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
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
          <hr style={{ width: '68%', margin: '3% 0', left: '10%' }} /> {/* Horizontal line */}
        </Box>
        {/* Routes for the selected tab */}
        <div className="text-white">
          {busRoutesData[selectedRoute]?.map((route, index) => (
            <div key={index}>{route}</div>
          ))}
        </div>
      </div>
    </div>
  );
}