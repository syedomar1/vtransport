
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ScheduleStyle from './ScheduleStyle';
import busRoutesData from '../../data_routes/routes_data.json';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export default function Schedule() {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedRouteStoppings, setSelectedRouteStoppings] = useState([]);

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedTiming('');
    setSelectedRouteStoppings(busRoutesData[event.target.value]);
  };

  const handleStoppingChange = (event) => {
    setSelectedTiming(event.target.value);
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <ScheduleStyle></ScheduleStyle>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '15%',
        height: '70%',
        width: '70%',
        backgroundColor: '#71b1eb',
        overflow: 'auto',
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
  );
}



