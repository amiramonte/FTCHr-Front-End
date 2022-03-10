import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import "../styles/style.css";
import { requirePropFactory } from "@mui/material";

const redOptions = { color: "red" };

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: requirePropFactory("./assets/icons/dogemoji.png"),
    iconSize: _iconSize,
  });
}

export default function Map() {
  return (
    <div id="map">
      <MapContainer className="map" center={[47.606, -122.332]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[47.606, -122.332]} icon={GetIcon(20)}>
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
