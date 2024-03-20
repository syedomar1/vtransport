import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "C:\\Users\\Admin\\Desktop\\vtran\\vtransport\\src\\leaf.css";
import 'leaflet/dist/leaflet.css';
import LeafletRoutingMachine from "./LeafletRoutingMachine";

function Map() {
  const position = [12.840808355866276, 80.15338538002061];
  return (
    <div className="Map" style = {{position: "fixed",top: "19%",height: "81%",width: "80%"}}>
      <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*  <LeafletGeocoder /> */}
        <LeafletRoutingMachine />
      </MapContainer>
    </div>  
  );
}

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;
export default Map;