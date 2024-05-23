const express = require('express');
const mongoose = require('mongoose');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { BusRouteModel, StopModel } = require('./models/models');
const { DataExtraction } = require('./data');

const app = express();
const port = 4010;
const filePath2 = path.join(__dirname, 'data_routes', 'bus_timings2.xlsx'); // Correct the path
const filePath = path.join(__dirname, 'data_routes', 'bus_locations.xlsx');
const data = DataExtraction(filePath, filePath2);
const busRoutesData = data[5];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000"); // Update this with your frontend URL
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let main = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');

        await BusRouteModel.deleteMany({});

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

    for (let i = busRouteData.length - 1; i >= 0; i--) {
        if (busRouteData[i]['NAME OF THE STOPPING'] !== 'VIT') {
            const stop = busRouteData[i];
            const locationName = stop['NAME OF THE STOPPING'];
            const time = stop['TIME A.M'];

            const hours = parseInt(time.substring(0, 2));
            const minutes = parseInt(time.substring(3, 5));
            const currentTimeInMinutes = hours * 60 + minutes;

            const timeDifference = prevTimeInMinutes - currentTimeInMinutes;

            if (timeDifference > 0) {
                boundingBox = calculateBoundingBox(prevCoordinates, timeDifference);
            } else {
                boundingBox = calculateBoundingBox(prevCoordinates, -1 * timeDifference);
            }

            const coordinates = await geocodeLocation(locationName);
            if (coordinates) {
                stop.coordinates = { type: 'Point', coordinates: coordinates };
                prevCoordinates = coordinates;
            } else {
                delete stop.coordinates;
            }
            prevTimeInMinutes = currentTimeInMinutes;
        }
    }
}

function calculateBoundingBox(coordinates, timeDiffMinutes) {
    const latAdjustment = timeDiffMinutes * 0.005;
    const lngAdjustment = timeDiffMinutes * 0.005;

    const bbox = [
        coordinates[0] - lngAdjustment,
        coordinates[1] - latAdjustment,
        coordinates[0] + lngAdjustment,
        coordinates[1] + latAdjustment
    ];
    return bbox;
}

async function geocodeAllBusRoutes(busRoutesData) {
    for (const routeName in busRoutesData) {
        const busRouteData = busRoutesData[routeName];
        await geocodeBusRoute(busRouteData);
    }
}

app.get('/routes', async (req, res) => {
    try {
        const busRoutesData = await BusRouteModel.find({});
        res.json(busRoutesData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', async (req, res) => {
    await main();
    res.send("Backend works");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
