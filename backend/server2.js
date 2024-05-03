import express from 'express';
import mongoose from 'mongoose';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { BusRouteModel, StopModel } from './models/models.js';
import { DataExtraction } from './data.js';
const app = express();
const port = 4010;
const filePath2 = "./data_routes/bus_timings2.xlsx"; // Assuming the script and data are in the same directory
const filePath="./data_routes/bus_locations.xlsx";
  // console.log(process.env.VITE_SECRET);
const data = DataExtraction(filePath, filePath2);
const busRoutesData = data[5];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000"); // Update this with your frontend URL
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

dotenv.config({ path: path.resolve('../.env') });

app.set('view engine', 'ejs');
app.set('views', path.join(new URL('.', import.meta.url).pathname));

let main = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL);
        console.log('Connected to MongoDB Atlas');

        await BusRouteModel.deleteMany({});

        const insertionArray = [];

        await geocodeAllBusRoutes(busRoutesData);

        for (const routeName in busRoutesData) {
            const stopsData = busRoutesData[routeName];
            const stops = [];

            for (const stopData of stopsData) {
                let coordinates;
                if (stopData.coordinates) {
                    coordinates = {
                        type: 'Point',
                        coordinates: stopData.coordinates.coordinates
                    };
                }

                if (coordinates) {
                    const stop = new StopModel({
                        name: stopData['NAME OF THE STOPPING'],
                        time: stopData['TIME A.M'],
                        coordinates: coordinates
                    });
                    await stop.save();
                    stops.push(stop);
                }
            }

            const busRoute = new BusRouteModel({
                routeNumber: routeName,
                stops: stops
            });

            await busRoute.save();
        }

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error:', error);
    }
};

const atlasConnectionString = process.env.ATLASDB_URL;
const mapToken = process.env.MAPBOX_APIKEY;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const chennaiBoundingBox = [79.7833, 12.3333, 80.8333, 13.6667];
let boundingBox = [79.2833, 12.8333, 81.0333, 14.2667];

async function geocodeLocation(locationName) {
    try {
        const response = await geocodingClient.forwardGeocode({
            query: locationName,
            limit: 1,
            bbox: chennaiBoundingBox
        }).send();

        if (response && response.body && response.body.features && response.body.features.length > 0) {
            const coordinates = response.body.features[0].geometry.coordinates;
            console.log(`Geocoding successful for location: ${locationName}`);
            return coordinates;
        } else {
            console.error(`Geocoding failed for location: ${locationName}`);
            return null;
        }
    } catch (error) {
        console.error(`Error geocoding location ${locationName}:`, error.message);
        return null;
    }
}

async function geocodeBusRoute(busRouteData) {
    let prevTimeInMinutes = 8 * 60; // Initial time set to 8:00 AM in minutes
    let prevCoordinates = [80.0772106, 12.840641]; // Initial coordinates set to [80.0772106, 12.840641]
    //console.log(busRouteData);
    for (let i = busRouteData.length - 1; i >= 0; i--) {
        if (busRouteData[i]['NAME OF THE STOPPING']!== 'VIT') {
        const stop = busRouteData[i];
        const locationName = stop['NAME OF THE STOPPING'];
        const time = stop['TIME A.M'];

        // Convert time to minutes
        const hours = parseInt(time.substring(0, 2));
        const minutes = parseInt(time.substring(3, 5));
        const currentTimeInMinutes = hours * 60 + minutes;

        // Calculate time difference
        const timeDifference = prevTimeInMinutes - currentTimeInMinutes;

        // Calculate bounding box based on time difference and previous coordinates4
        if(timeDifference>0){
            boundingBox = calculateBoundingBox(prevCoordinates, timeDifference);
        }
        else{
            boundingBox = calculateBoundingBox(prevCoordinates, -1*timeDifference);
        }
        

         // Check if stop name is not "VIT"
            const coordinates = await geocodeLocation(locationName);
            if (coordinates) {
                stop.coordinates = { type: 'Point', coordinates: coordinates };
                //console.log(prevCoordinates, coordinates);
                prevCoordinates = coordinates; // Update previous coordinates
            } else {
                delete stop.coordinates;
            }
            prevTimeInMinutes = currentTimeInMinutes; 
        }
        
        // Update previous time
    }
}
// Function to calculate bounding box based on coordinates and timing difference
function calculateBoundingBox(coordinates, timeDiffMinutes) {
    //console.log(timeDiffMinutes, 'time difference');
    // Calculate adjustments based on time difference
    const latAdjustment = timeDiffMinutes * 0.005; // Adjust latitude by 0.0001 degrees per minute
    const lngAdjustment = timeDiffMinutes * 0.005; // Adjust longitude by 0.0002 degrees per minute

    // Calculate bounding box
    const bbox = [
        coordinates[0] - lngAdjustment, // west
        coordinates[1] - latAdjustment, // south
        coordinates[0] + lngAdjustment, // east
        coordinates[1] + latAdjustment  // north
    ];
    return bbox;
}

async function geocodeAllBusRoutes(busRoutesData) {
    for (const routeName in busRoutesData) {
        const busRouteData = busRoutesData[routeName];
        await geocodeBusRoute(busRouteData);
    }
}

// Define the /routes endpoint to fetch bus routes data
app.get('/routes', async (req, res) => {
    try {
        const busRoutesData = await BusRouteModel.find({});
        res.json(busRoutesData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define the main route to run the main function and send a response
app.get('/', async (req, res) => {
    await main();
    res.send("Backend works"); // Or any other response
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
