import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
} from "react-leaflet";
import { Icon } from "leaflet";
import "../styles/style.css";

const redOptions = { color: "red" };

export default function Map() {
  return (
    <div id="map">
      <MapContainer className="map" center={[47.606, -122.332]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[47.606, -122.332]}>
          <Popup>
            Hangout at Discovery Park <br /> 2PM
          </Popup>
        </Marker>
        <Marker position={[47.606, -122.329]}>
          <Popup>
            Chilling with my doggo, come hang! <br /> 5PM
          </Popup>
        </Marker>
        <Marker position={[47.606, -122.331]}>
          <Popup>
            Pet my cat! <br /> 3PM
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
