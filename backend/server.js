import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { BusRouteModel } from './models/models.js'; // Import your schema and model
import { DataExtraction } from './data.js'; // Import data extraction function
dotenv.config({ path: path.resolve('../.env') });

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());

app.get('/api/data', async (req, res) => {
    try {
        const filePath2 = "./data_routes/bus_timings2.xlsx"; // Assuming the script and data are in the same directory
        const filePath = "./data_routes/bus_locations.xlsx";
        
        // Connect to MongoDB Atlas
        const atlasConnectionString = process.env.VITE_ATLASDB_URL;
        await mongoose.connect(atlasConnectionString);
        console.log('Connected to MongoDB Atlas');

        // Fetch all bus routes from MongoDB
        const busRoutes = await BusRouteModel.find().lean();
        console.log('Fetched all bus routes from MongoDB:', busRoutes);

        // Extract data from files
        const data = DataExtraction(filePath, filePath2);

        // Send both data and bus routes
        res.json({ data, busRoutes });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
