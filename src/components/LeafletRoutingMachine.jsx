import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  
  useEffect(() => {
    //var marker1 = L.marker([36.8065, 10.1815], { icon: DefaultIcon }).addTo(
    //  map
    //);
    function add(jk,col) {
      //L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

      L.Routing.control({
        //waypoints: [
        //  L.latLng([13.043756304517126, 80.2792302945772]),
        //  L.latLng([12.9439314995322, 80.15376341071567]),
        //],
        waypoints: jk.map(L.latLng),

        lineOptions: {
          styles: [
            {
              color: col,
              weight: 4,
              opacity: 0.7,
            },
          ],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      })
        .addTo(map);
    };
    
    add([[13.043756304517126, 80.2792302945772],[12.840776974299054, 80.15346048194998]],"blue");
    add([[12.9439314995322, 80.15376341071567],[12.840776974299054, 80.15346048194998]],"red");
  }, []);

  
  return null;
};

export default LeafletRoutingMachine;