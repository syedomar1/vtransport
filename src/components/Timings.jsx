import React, { useState ,useContext } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem component
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DataContext } from '../App';
import { ConstructionOutlined } from "@mui/icons-material";

export default function Timings() {
    const { apiData ,busRoutes,mapboxApiKey} = useContext(DataContext);
    const busdata = apiData;
    const data=busdata[5];
    //console.log(busRoutes);
    //console.log(data);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const searchInSheets = (selectedRoute) => {
        let foundData = [];
        
        const allData = busdata[0].concat(busdata[1], busdata[3]);

        // Filter the combined data array based on whether the routeName includes the selectedRoute
        foundData = allData.filter( route=>selectedRoute.includes(route.routeNo) && selectedRoute.includes(route.routeName));
        console.log(selectedRoute);
        console.log("Filtered Data:", foundData);
        return foundData;
    };

    const handleRouteChange = (event) => {
        const selectedRoute = event.target.value;
        setSelectedRoute(selectedRoute);
        
        // Additional logic related to route change can be added here
        // Search for the selected route in all sheets
        const foundData = searchInSheets(selectedRoute);
        //console.log(foundData);
        //console.log("idk man");
        setFilteredData(foundData);
        //console.log(filteredData);
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "0%",
                height: "100vh",
                width: "100%",
                backgroundColor: "rgb(8,44,84)",
                overflow: "hidden",
            }}
        >
            <div
                className="container"
                style={{
                    width: "70vw",
                    height: "72vh",
                    borderRadius: "10px 10px 10px 10px",
                    backgroundColor: "#71b1eb",
                    overflowY: "auto",
                    overflowX: "hidden",
                    padding: "20px",
                    paddingTop: "0px",
                    marginTop: "20vh",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div className="py-5 px-5 mx-10 mb-10 self-start bg-transparent border-l-8 border-white">
                    <p className="text-4xl font-bold text-white font-mono">
                        BUS DETAILS
                    </p>
                </div>
                
                <div style={{ width: "80%" }}>
                    <form>
                        <Box sx={{ display: 'flex', flexDirection: 'row',  marginBottom:"2.5rem"}}>
                        <TextField
    id="busNumber"
    select
    label="Select Route Number"
    value={selectedRoute}
    onChange={handleRouteChange}
    className="w-full mb-4"
    variant="outlined"
    placeholder="Select Route Number"
    sx={{
        mr: 2,
        width: '30vw',
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
          sx: { maxHeight: "50vh",  maxWidth:'30vw'},
        },
      }}
      InputProps={{
        style: { textAlign: 'center', color: 'white' },
      }}
>
    {Object.keys(busdata[5]).map((routeName) => (
        <MenuItem key={routeName} value={routeName}>
            {routeName}
        </MenuItem>
    ))}
</TextField>

                        </Box>
                        <hr className="w-full h-10"></hr>
                    </form>
                </div>

                <Accordion style={{ margin: '0% 5%', width: '90%', marginBottom:'2rem' }} expanded={activeAccordion === 0} onChange={() => toggleAccordion(0)}>
                    <AccordionSummary
                        expandIcon={activeAccordion === 0 ? <RemoveIcon /> : <AddIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ backgroundColor: 'white', color: '#71b1eb', textAlign: 'center' }}
                    >
                        <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>Bus Incharge Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ color: '#71b1eb', marginBottom:'2rem'}}>
                        {/* Your Bus Incharge Info content goes here */}
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ margin: '0% 5%', width: '90%', marginBottom:'2rem' }} expanded={activeAccordion === 1} onChange={() => toggleAccordion(1)}>
                    <AccordionSummary
                        expandIcon={activeAccordion === 1 ? <RemoveIcon /> : <AddIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        sx={{ backgroundColor: 'white', color: '#71b1eb', textAlign: 'center' }}
                    >
                        <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>Bus Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ color: '#71b1eb', marginBottom:'2rem'}}>
                        {/* Your Bus Information content goes here */}
                        {/* Render the filtered data */}
        {filteredData.map((route, index) => (
            <div key={index}>
                <Typography>Route Number: {route.routeNo}</Typography>
                <Typography>Route Name: {route.routeName}</Typography>
                {/* Add more details if needed */}
            </div>
        ))}
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ margin: '0% 5%', width: '90%', marginBottom:'2rem' }} expanded={activeAccordion === 2} onChange={() => toggleAccordion(2)}>
                    <AccordionSummary
                        expandIcon={activeAccordion === 2 ? <RemoveIcon /> : <AddIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={{ backgroundColor: 'white', color: '#71b1eb', textAlign: 'center' }}
                    >
                        <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>Route Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ color: '#71b1eb', marginBottom:'2rem'}}>
                        {/* Your Route Information content goes here */}
                    </AccordionDetails>
                </Accordion>

            </div>
        </div>
    );
}

