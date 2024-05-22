import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Home = ({ mapboxAccessToken, busRoutes }) => {
    useEffect(() => {
        mapboxgl.accessToken = mapboxAccessToken;

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [80.0772106, 12.840641],
            zoom: 10
        });

        const redMarkerCoords = [80.153963, 12.840722];

        new mapboxgl.Marker({
            color: 'red'
        })
        .setLngLat(redMarkerCoords)
        .setPopup(new mapboxgl.Popup().setHTML('<h4>VIT Chennai</h4>'))
        .addTo(map);

        busRoutes.forEach(route => {
            route.stops.forEach((stop, i) => {
                const layerId = stop.name + '-layer';
                if (i === 0) {
                    new mapboxgl.Marker({
                        color: route.color
                    })
                    .setLngLat(stop.coordinates)
                    .setPopup(new mapboxgl.Popup().setHTML('<h3>Route: ' + route.routeNumber + '</h3>' +
                                                            '<p>Stop: ' + stop.name + '</p>' +
                                                            '<p>Time: ' + stop.time + '</p>'))
                    .addTo(map);
                } else {
                    const circleLayerId = stop.name + '-circle';
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
                                    coordinates: stop.coordinates
                                }
                            }
                        },
                        paint: {
                            'circle-color': route.color,
                            'circle-radius': 5
                        }
                    });

                    map.on('click', circleLayerId, function(e) {
                        var popupContent = '<h3>Route: ' + route.routeNumber + '</h3>' +
                                           '<p>Stop: ' + stop.name + '</p>' +
                                           '<p>Time: ' + stop.time + '</p>';

                        new mapboxgl.Popup()
                            .setLngLat(e.features[0].geometry.coordinates)
                            .setHTML(popupContent)
                            .addTo(map);
                    });
                }
            });

            for (let i = 0; i < route.stops.length - 1; i++) {
                const origin = route.stops[i].coordinates;
                const destination = route.stops[i + 1].coordinates;
                const directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + origin[0] + ',' + origin[1] + ';' + destination[0] + ',' + destination[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

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

            const lastStop = route.stops[route.stops.length - 1].coordinates;
            const directionsRequestToRedMarker = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + lastStop[0] + ',' + lastStop[1] + ';' + redMarkerCoords[0] + ',' + redMarkerCoords[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

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
    }, [busRoutes, mapboxAccessToken]);

    return <div id="map" style={{ position: 'absolute', top: '5%', left: '5%', bottom: 0, width: '90%', height: '90%' }} />;
};

export default Home;
