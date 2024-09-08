import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "./assets/icon-location.svg";
import Background from "./assets/pattern-bg-desktop.png";
import L from "leaflet";

function App() {
  return (
    <>
      <div style={{backgroundImage:`url(${Background})`}} className="bg-cover bg-no-repeat bg-blue-500 text-center">
        <h1 className="text-white text-2xl my-5">IP Address Tracker</h1>
        <div className="bg-white w-fit ps-5 rounded-xl m-auto w-96 flex justify-between">
          <input className="bg-transparent pe-5 w-full focus:outline-none" type="text" placeholder="Search for any IP address or domain"/>
          <button className="p-3 bg-black text-white rounded-e-xl" >
            {'>'}
          </button>
        </div>
        <div className="bg-white flex justify-between p-5 py-7 container w-11/12 m-auto rounded-lg translate-y-1/2 z-10 relative text-left">
          <div className="border-e px-5 w-1/4">
            <h5  className="text-sm">IP Address</h5>
            <p className="text-lg font-bold">192.212.174.101</p>
          </div>
          <div className="border-e px-5 w-1/4">
            <h5 className="text-sm">Location </h5>
            <p className="text-lg font-bold ">Brooklyn,NY 10001</p>
          </div>
          <div className="border-e px-5 w-1/4">
            <h5 className="text-sm">Timezone</h5>
            <p className="text-lg font-bold ">UTC-05:00</p>
          </div>
          <div className="px-5 w-1/4">
            <h5 className="text-sm">ISP</h5>
            <p className="text-lg font-bold ">SpaceX Starlink</p>
          </div>
        </div>
      </div>
        <MapContainer
          className="w-full flex-grow z-0"
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
    </>
  );
}

export default App;
