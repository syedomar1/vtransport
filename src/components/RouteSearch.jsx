import React, { useState, useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { DataContext } from '../App';

const MapComponent = () => {
    const { busRoutes, mapboxApiKey } = useContext(DataContext);
    const [selectedRouteNumber, setSelectedRouteNumber] = useState('');
    const [map, setMap] = useState(null);

    const redMarkerCoords = [80.153963, 12.840722];

    useEffect(() => {
        if (mapboxApiKey) {
            mapboxgl.accessToken = mapboxApiKey;
            const initializeMap = () => {
                if (map) {
                    map.remove();
                }
                const mapInstance = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [80.0772106, 12.840641], // Center the map on a default location
                    zoom: 10 // Adjust the zoom level as needed
                });

                new mapboxgl.Marker({
                    color: 'red'
                })
                .setLngLat(redMarkerCoords)
                .setPopup(new mapboxgl.Popup().setHTML('<h4>VIT Chennai</h4>'))
                .addTo(mapInstance);

                setMap(mapInstance);
            };

            initializeMap();
        }
    }, [mapboxApiKey]);

    const handleRouteChange = (event) => {
        setSelectedRouteNumber(event.target.value);
    };

    const searchRoute = () => {
        if (selectedRouteNumber && map) {
            const selectedRoute = busRoutes.find(route => route.routeNumber === selectedRouteNumber);
            if (selectedRoute) {
                renderRouteOnMap(selectedRoute);
            }
        }
    };

    const renderRouteOnMap = (route) => {
        if (!map) return;

        // Remove existing layers
        map.getStyle().layers.forEach(layer => {
            if (layer.id.startsWith(route.routeNumber + '-line')) {
                map.removeLayer(layer.id);
                map.removeSource(layer.id);
            }
        });

        route.stops.forEach(stop => {
            if (stop.name !== "VIT UNIVERSITY") {
                new mapboxgl.Marker({
                    color: route.color // Set marker color to route's color
                })
                .setLngLat(stop.coordinates.coordinates)
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>Route: ${route.routeNumber}</h3>
                                                       <p>Stop: ${stop.name}</p>
                                                       <p>Time: ${stop.time}</p>`))
                .addTo(map);
            }
        });

        for (let i = 0; i < route.stops.length - 1; i++) {
            const origin = route.stops[i].coordinates.coordinates;
            const destination = route.stops[i + 1].coordinates.coordinates;
            const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${mapboxApiKey}`;

            fetch(directionsRequest)
                .then(response => response.json())
                .then(data => {
                    map.addLayer({
                        id: `${route.routeNumber}-line-${i}`,
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
                            'line-color': 'blue',
                            'line-width': 1
                        }
                    });
                })
                .catch(error => console.error('Error fetching route:', error));
        }

        const lastStop = route.stops[route.stops.length - 1].coordinates.coordinates;
        const directionsRequestToRedMarker = `https://api.mapbox.com/directions/v5/mapbox/driving/${lastStop[0]},${lastStop[1]};${redMarkerCoords[0]},${redMarkerCoords[1]}?steps=true&geometries=geojson&access_token=${mapboxApiKey}`;

        fetch(directionsRequestToRedMarker)
            .then(response => response.json())
            .then(data => {
                map.addLayer({
                    id: `${route.routeNumber}-line-end`,
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
                        'line-color': 'blue',
                        'line-width': 1
                    }
                });
            })
            .catch(error => console.error('Error fetching route to red marker:', error));
    };

    return (
        <div>
            <div id="map" style={{ position: 'absolute', top: '5%', left: '5%', bottom: 0, width: '90%', height: '90%' }}></div>
            <div className="bus-route-select" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 9999, backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>
                <label htmlFor="busRouteSelect">Select a Bus Route:</label>
                <select id="busRouteSelect" onChange={handleRouteChange} value={selectedRouteNumber}>
                    <option value="">Select a route</option>
                    {busRoutes.map((route, index) => (
                        <option key={index} value={route.routeNumber}>{route.routeNumber}</option>
                    ))}
                </select>
            </div>
            <button className="search-button" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 9999, padding: '10px 20px', backgroundColor: '#158ae6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={searchRoute}>
                Search
            </button>
        </div>
    );
};

export default MapComponent;
