import express from 'express';
const mongoose = require('mongoose');
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'; // Import dotenv for loading environment variables
dotenv.config({ path: path.resolve('../.env') });
const app = express();
const port = 8000; // Set port to 8000
const { BusRouteModel } = require('./models');

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Adjust views directory if needed

// Define your data extraction function from data.js
import { DataExtraction } from './data.js';

app.get('/api/data', (req, res) => {
  const filePath2 = "./data_routes/bus_timings2.xlsx"; // Assuming the script and data are in the same directory
  const filePath="./data_routes/bus_locations.xlsx";
  // console.log(process.env.VITE_SECRET);
  const data = DataExtraction(filePath, filePath2);
  res.json(data); // Send only the data object
});

// MongoDB connection
const atlasConnectionString = process.env.ATLASDB_URL;
mongoose.connect(atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define the main function to fetch bus routes
const fetchBusRoutes = async () => {
    try {
        const busRoutes = await BusRouteModel.find().lean();
        return busRoutes;
    } catch (error) {
        console.error('Error fetching bus routes:', error);
        return [];
    }
};

// Routes from Map project
app.get('/input', async (req, res) => {
    const busRoutes = await fetchBusRoutes();
    res.render('input', {
        mapboxAccessToken: process.env.MAPBOX_APIKEY,
        busRoutes: busRoutes
    });
});

app.get('/', async (req, res) => {
    const busRoutes = await fetchBusRoutes();
    res.render('home', {
        mapboxAccessToken: process.env.MAPBOX_APIKEY,
        busRoutes: busRoutes
    });
});

app.get("/",(req,res)=>{
  res.send("hello");
})

// Define additional routes if needed
app.use('/api', require('./data_routes')); // Assuming you have other routes

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
