const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { BusRouteModel } = require('./models/models'); // Import your schema and model
const { DataExtraction } = require('./data'); // Import data extraction function

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());

app.get('/api/data', async (req, res) => {
    try {
        const filePath2 = path.join(__dirname, 'data_routes', 'bus_timings2.xlsx'); // Correct the path
        const filePath = path.join(__dirname, 'data_routes', 'bus_locations.xlsx');

        // Connect to MongoDB Atlas
        const atlasConnectionString = process.env.VITE_ATLASDB_URL;
        await mongoose.connect(atlasConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
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