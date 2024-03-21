import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ScheduleStyle from './ScheduleStyle';
// import busRoutesData from '../../backend/data_routes/routes_data.json';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export default function Schedule({busdata}) {
  const busRoutesData=busdata[5];
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTiming, setSelectedTiming] = useState(''); 
  const [selectedRouteStoppings, setSelectedRouteStoppings] = useState([]);

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedRouteStoppings(busRoutesData[event.target.value]);
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
    // desc: `Routes for ${date} will be added soon`,
  }));

  return (
    <div style={{ position: 'relative', overflow: 'auto' }}>
      {/* Your content here */}
      <div style={{ zIndex: 0, position: 'relative', minHeight: '100vh' }}>
        <div style={{
          position: 'sticky',
          top: '15%',
          left: '10%',
          height: '75vh',
          width: '80vw',
          borderRadius: '20px',
          backgroundColor: '#71b1eb',
          overflow:'auto',
        }}>
          <Tabs id="custom-animation" value="{currentValue}">
  <TabsHeader>
    {data.map(({ label, value }, index) => (
      <Tab
        key={value}
        value={value}
        className={`tab-item border border-black-500 border-solid rounded-t-md ${index !== 0 ? 'border-l-0' : ''} hover:bg-blue-${index + 3}00 hover:text-white py-2 px-4 inline-block cursor-pointer transition duration-300`}
        style={{ 
          backgroundColor: `rgb(0, ${index * 20 + 80}, ${index * 20 + 180})`,
          width: `${100 / data.length}%` // Ensure equal width for each tab
        }}
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
                  width: '27vw',
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
                    sx: { maxHeight: "50vh",  maxWidth:'25vw'},
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
                <MenuItem value="MORNING">Morning</MenuItem>
                <MenuItem value="1:45 PM">1:45 PM</MenuItem>
                <MenuItem value="5:00 PM">5:00 PM</MenuItem>
                <MenuItem value="6:00 PM">6:00 PM</MenuItem>
              </TextField>
            </Box>
            <hr style={{ width: '80%', margin: '3% 0' , left:'10%' }} />
          </Box>
          <Accordion style={{ margin: '0% 5%', width: '90%' }}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ backgroundColor: 'white', color: '#71b1eb', textAlign: 'center' }}
            >
              <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>{selectedRoute}</Typography>
              <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>{selectedTiming}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ color: '#71b1eb'}}>
              <table className="table-fixed w-full text" style={{textColor:"#71b1eb"}}>
                <thead>
                  <tr>
                    <th className="w-1/3 p-3 text-center">BUS ROUTE NO</th>
                    <th className="w-1/3 p-3 text-center">STOP_NAME</th>
                    <th className="w-1/3 p-3 text-center">TIMING</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRouteStoppings.map((stopping, index) => (
                    <tr key={index}>
                      <td className="p-3 text-center">{selectedRoute}</td>
                      <td className="p-3 text-center">{stopping["NAME OF THE STOPPING"]}</td>
                      <td className="p-3 text-center">{stopping["TIME A.M"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <ScheduleStyle />
    </div>
  );
}