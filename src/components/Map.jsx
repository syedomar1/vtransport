import React, { useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { DataContext } from '../App';

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default function Map() {
    const { busRoutes, mapboxApiKey } = useContext(DataContext);
    console.log(busRoutes);

    // Assign random colors to each route
    useEffect(() => {
        busRoutes.forEach(route => {
            route.color = getRandomColor();
        });
    }, [busRoutes]);

    useEffect(() => {
        // Access the Mapbox access token passed from the server
        var mapboxAccessToken = mapboxApiKey;

        // Initialize map with the retrieved access token
        mapboxgl.accessToken = mapboxAccessToken;

        // Initialize map
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [80.0772106, 12.840641], // Center the map on a default location
            zoom: 10 // Adjust the zoom level as needed
        });

        // Red marker coordinates
        var redMarkerCoords = [80.153963, 12.840722];

        // Add red marker for the specified coordinates
        new mapboxgl.Marker({
            color: 'red' // Set marker color to red
        })
        .setLngLat(redMarkerCoords)
        .setPopup(new mapboxgl.Popup().setHTML('<h4>VIT Chennai</h4>'))
        .addTo(map);

        map.on('load', function() {
            // Object to keep track of added layers
            var addedLayers = {};

            // Add circles or markers for each stop with unique colors for each route
            busRoutes.forEach(route => {
                route.stops.forEach((stop, i) => {
                    console.log(stop.coordinates);
                    const layerId = stop.name + '-layer';
                    if (i === 0) { // If it's the first stop, add a marker
                        // Add marker for the specified coordinates
                        new mapboxgl.Marker({
                            color: route.color // Set marker color to route's color
                        })
                            .setLngLat(stop.coordinates.coordinates) // Updated to use stop.coordinates.coordinates
                            .setPopup(new mapboxgl.Popup().setHTML('<h3>Route: ' + route.routeNumber + '</h3>' +
                                                               '<p>Stop: ' + stop.name + '</p>' +
                                                               '<p>Time: ' + stop.time + '</p>'))
                            .addTo(map);
                    } else { // If it's not the first stop, add a circle
                        const circleLayerId = stop.name + '-circle';

                        // Check if the layer already exists
                        if (!addedLayers[circleLayerId]) {
                            map.addLayer({
                                id: circleLayerId,
                                type: 'circle',
                                source: {
                                    type: 'geojson',
                                    data: {
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: 'Point',
                                            coordinates: stop.coordinates.coordinates // Updated to use stop.coordinates.coordinates
                                        }
                                    }
                                },
                                paint: {
                                    'circle-color': route.color, // Set circle color to route's color
                                    'circle-radius': 5 // Adjust circle radius as needed
                                }
                            });

                            // Add click event listener to each circle
                            map.on('click', circleLayerId, function(e) {
                                var popupContent = '<h3>Route: ' + route.routeNumber + '</h3>' +
                                                   '<p>Stop: ' + stop.name + '</p>' +
                                                   '<p>Time: ' + stop.time + '</p>';

                                new mapboxgl.Popup()
                                    .setLngLat(e.features[0].geometry.coordinates)
                                    .setHTML(popupContent)
                                    .addTo(map);
                            });

                            // Set the layer as added
                            addedLayers[circleLayerId] = true;
                        }
                    }
                });

                // Connect stops based on route directions
                for (let i = 0; i < route.stops.length - 1; i++) {
                    const origin = route.stops[i].coordinates.coordinates;
                    const destination = route.stops[i + 1].coordinates.coordinates;
                    const directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + origin[0] + ',' + origin[1] + ';' + destination[0] + ',' + destination[1] + '?steps=true&geometries=geojson&access_token=' + mapboxAccessToken;

                    // Use fetch function to make HTTP request
                    fetch(directionsRequest)
                        .then(response => response.json())
                        .then(data => {
                            map.addLayer({
                                id: route.routeNumber + '-line-' + i,
                                type: 'line',
                                source: {
                                    type: 'geojson',
                                    data: data.routes[0].geometry
                                },
                                layout: {
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                },
                                paint: {
                                    'line-color': route.color,
                                    'line-width': 1
                                }
                            });
                        })
                        .catch(error => console.error('Error fetching route:', error));
                }

                // Connect the last stop of each route to the red marker
                const lastStop = route.stops[route.stops.length - 1].coordinates.coordinates;
                const directionsRequestToRedMarker = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + lastStop[0] + ',' + lastStop[1] + ';' + redMarkerCoords[0] + ',' + redMarkerCoords[1] + '?steps=true&geometries=geojson&access_token=' + mapboxAccessToken;

                // Use fetch function to make HTTP request
                fetch(directionsRequestToRedMarker)
                    .then(response => response.json())
                    .then(data => {
                        map.addLayer({
                            id: route.routeNumber + '-line-end',
                            type: 'line',
                            source: {
                                type: 'geojson',
                                data: data.routes[0].geometry
                            },
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round'
                            },
                            paint: {
                                'line-color': route.color,
                                'line-width': 1
                            }
                        });
                    })
                    .catch(error => console.error('Error fetching route to red marker:', error));
            });
        });

        // Empty dependency array means this effect runs once on mount
    }, []);

    return (
        <div id="map" style={{ position: 'absolute', top: '25%', bottom: 0, width: '100%', height: '75%' }}></div>
    );
}





// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import L from "leaflet";
// import "../leaf.css";
// import 'leaflet/dist/leaflet.css';
// import LeafletRoutingMachine from "./LeafletRoutingMachine";

// function Map() {
//   const position = [12.840808355866276, 80.15338538002061];
//   return (
//     <div className="Map" style = {{position: "fixed",height: "80%",width: "100vw", marginLeft:"0vw"}}>
//       <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {/*  <LeafletGeocoder /> */}
//         <LeafletRoutingMachine />
//       </MapContainer>
//     </div>  
//   );
// }

// let DefaultIcon = L.icon({
//   iconUrl: "/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
// });
// L.Marker.prototype.options.icon = DefaultIcon;
// export default Map;
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import L from "leaflet";
// import "../leaf.css";
// import 'leaflet/dist/leaflet.css';
// import LeafletRoutingMachine from "./LeafletRoutingMachine";

// function Map() {
//   const position = [12.840808355866276, 80.15338538002061];
//   return (
//     <div className="Map" style = {{position: "fixed",height: "80%",width: "100vw", marginLeft:"0vw"}}>
//       <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {/*  <LeafletGeocoder /> */}
//         <LeafletRoutingMachine />
//       </MapContainer>
//     </div>  
//   );
// }

// let DefaultIcon = L.icon({
//   iconUrl: "/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
// });
// L.Marker.prototype.options.icon = DefaultIcon;
// export default Map;