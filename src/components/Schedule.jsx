import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ScheduleStyle from './ScheduleStyle';
import { Tabs, TabsHeader, Tab, TabPanel } from "@material-tailwind/react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DataContext } from '../App';

export default function Schedule() {
  const { apiData } = useContext(DataContext);
  const busdata = apiData;
  const [busRoutesData, setBusRoutesData] = useState(busdata[5]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedRouteStoppings, setSelectedRouteStoppings] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#71b1eb');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedRouteStoppings(busRoutesData[event.target.value]);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleStoppingChange = (event) => {
    setSelectedTiming(event.target.value);
    // Update busRoutesData based on selected timing
    switch (event.target.value) {
      case 'MORNING':
        setBusRoutesData(busdata[5]);
        break;
      case '1:45 PM':
        setBusRoutesData(busdata[6]);
        break;
      case '5:00 PM':
        setBusRoutesData(busdata[7]);
        break;
      case '6:00 PM':
        setBusRoutesData(busdata[8]);
        break;
    }
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
  }));

  return (
    <div style={{ position: 'relative', overflow: 'auto', }}>
      <div style={{ zIndex: 0, position: 'relative', minHeight: '100vh'}}>
        <div style={{
          position: 'sticky',
          top: '18%',
          left: '10%',
          height: '75vh',
          width: '80vw',
          borderRadius: '20px',
          backgroundColor,
          overflow: 'auto',
        }}>
          <Tabs id="custom-animation" value={currentValue}>
            <TabsHeader>
              {data.map(({ label, value }, index) => (
                <Tab
                  key={value}
                  value={value}
                  className={`rounded-tr-2xl rounded-tl-md ${index !== 0 ? 'border-l-0' : ''} hover:bg-blue-${index + 3}00 hover:text-white py-5 px-4 mx--2 inline-block cursor-pointer transition duration-300 border-b-4 border-white-500 text-white`}
                  style={{ backgroundColor: `rgb(0, ${index * 20 + 80}, ${index * 20 + 180})`, fontFamily: "Inria Sans, sans-serif" }}
                  onClick={() => setBackgroundColor(`rgb(0, ${index * 20 + 80}, ${index * 20 + 180})`)}
                >
                  <span className="text-3xl">{label.slice(0, 2)}</span>{label.slice(2, 4)}  <span className="text-xl">{label.slice(4)}</span>
                </Tab>
              ))}
            </TabsHeader>
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
          <Accordion style={{ margin: '0% 5%', width: '90%', marginBottom:'2rem' }}>
            <AccordionSummary
              expandIcon={activeAccordion === 0 ? <RemoveIcon /> : <AddIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ backgroundColor: 'white', color: backgroundColor, textAlign: 'center' }}
            >
              <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>{selectedRoute}</Typography>
              <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>{selectedTiming}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ color: backgroundColor, marginBottom:'2rem'}}>
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