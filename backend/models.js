const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Stop Schema
const StopSchema = new Schema({
    name: String,
    time: String,
    coordinates: {
        type: { type: String, default: "Point" },
        coordinates: [Number] // [longitude, latitude]
    }
});

// Define Bus Route Schema
const BusRouteSchema = new Schema({
    routeNumber: String,
    stops: [StopSchema]
});

// Index for geospatial queries
StopSchema.index({ coordinates: '2dsphere' });

// Create models
const StopModel = mongoose.model('Stop', StopSchema);
const BusRouteModel = mongoose.model('BusRoute', BusRouteSchema);

module.exports = {
    StopModel,
    BusRouteModel
};
