import { useEffect, useReducer, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "./assets/icon-location.svg";
import Background from "./assets/pattern-bg-desktop.png";
import L from "leaflet";
const initialState = {
  ip: "",
  country: "",
  region: "",
  city: "",
  timezone: "",
  isp: "",
  lng: "",
  lat: "",
  timezone: "",
  buttonClicked: true,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setIP":
      return { ...state, ip: action.payload };
    case "reset":
      return initialState;
    case "setState":
      const {
        isp,
        location: { country, region, city, lat, lng, timezone },
      } = action.payload;
      return {
        ...state,
        isp,
        country,
        region,
        city,
        lat,
        lng,
        timezone,
        buttonClicked: false,
        error: "",
      };
    case "setButtonClicked":
      return { ...state, buttonClicked: true };
    case "setError":
      return { ...state, error: action.payload };
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_J3Xl4k9Re2OqMk2GrUeuEmkONCJuB&ipAddress=${
            state.ip ? state.ip : "8.8.8.8"
          }`
        );
        console.log("Res: ", res);
        if (res.status != 200) {
          dispatch({ type: "setError", payload: "this ip is invalid" });
          return;
        }
        const data = await res.json();
        console.log(data);
        if (
          data.location.country == "ZZ" ||
          data.location.lat == 0 ||
          data.location.lng == 0
        ) {
          dispatch({
            type: "setError",
            payload:
              "This IP is private IP address please enter public IP address",
          });
        } else {
          dispatch({ type: "setState", payload: data });
        }
      } catch (e) {
        console.log("Error :", e.message);
        dispatch({ type: "setError", payload: e.message });
      }
    }
    if (state.buttonClicked) getData();
  }, [state.buttonClicked]);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-no-repeat bg-blue-500 text-center"
      >
        <h1 className="text-white text-2xl my-5">IP Address Tracker</h1>
        <div className="text-left w-fit m-auto">
          <div className="bg-white ps-5 rounded-xl m-auto w-11/12 sm:w-96 flex justify-between">
            <input
              className="bg-transparent pe-5 w-full focus:outline-none"
              type="text"
              placeholder="Search for any IP address or domain"
              value={state.ip}
              onChange={(e) =>
                dispatch({ type: "setIP", payload: e.target.value })
              }
            />

            <button
              className="py-3 px-5 bg-black text-white rounded-e-xl text-2xl"
              onClick={(e) => dispatch({ type: "setButtonClicked" })}
            >
              {">"}
            </button>
          </div>
          {state.error != "" && (
            <label className="text-red-500 italic">{state.error}</label>
          )}
        </div>
        <div className="bg-white flex flex-col gap-5 md:flex-row  p-5 py-7 container w-11/12 m-auto rounded-lg translate-y-1/2 z-10 relative text-center md:text-left">
          <div className="md:border-e px-5 w-full md:w-1/4">
            <h5 className="text-sm text-[#939393] font-semibold">IP Address</h5>
            <p className="text-lg font-bold">
              {state.ip && !state.error ? state.ip : "8.8.8.8"}
            </p>
          </div>
          <div className="md:border-e px-5 w-full md:w-1/4">
            <h5 className="text-sm text-[#939393] font-semibold">Location </h5>
            <p className="text-lg font-bold ">
              {!state.error
                ? `${state.city} ${state.city ? "," : ""} ${state.country}`
                : "Mountain View , US"}
            </p>
          </div>
          <div className="md:border-e px-5 w-full md:w-1/4">
            <h5 className="text-sm text-[#939393] font-semibold">Timezone</h5>
            <p className="text-lg font-bold ">
              {!state.error ? `UTC ${state.timezone}` : "UTC -07:00"}
            </p>
          </div>
          <div className="px-5 w-full md:w-1/4">
            <h5 className="text-sm text-[#939393] font-semibold">ISP</h5>
            <p className="text-lg font-bold ">
              {!state.error ? state.isp : "Google LLC"}
            </p>
          </div>
        </div>
      </div>
      <MapContainer
        className="w-full flex-grow z-0"
        center={[state.lat, state.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <ChangeCenter position={[state.lat, state.lng]} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[state.lat, state.lng]}
          icon={L.icon({
            iconUrl: MarkerIcon,
          })}
        ></Marker>
      </MapContainer>
    </>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}
export default App;
