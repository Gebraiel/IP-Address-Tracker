import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "./assets/icon-location.svg";
import L from "leaflet";

function App() {
  return (
    <>
      <div>
        <h1>IP Address Tracker</h1>
      </div>
      <div className="map">
        <MapContainer
          className="w-full h-40"
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[51.505, -0.09]}
            icon={L.icon({
              iconUrl: MarkerIcon,
            })}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default App;
