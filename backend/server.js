const express = require('express');
const cors = require('cors');
const { DataExtraction } = require('./data.js');

const app = express();
const port = 8000; // Set port to 8000

// Enable CORS
app.use(cors());

// Define your data extraction function from data.js
// import { DataExtraction } from './data.js';

app.get('/api/data', (req, res) => {
  const filePath2 = "./data_routes/bus_timings2.xlsx"; // Assuming the script and data are in the same directory
  const filePath="./data_routes/bus_locations.xlsx";
  console.log("working");
  const data = DataExtraction(filePath, filePath2);
  res.json(data); // Send only the data object
});

app.get("/",(req,res)=>{
  res.send("hello");
})

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
