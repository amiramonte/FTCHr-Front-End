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
import { useEffect, useState } from "react";

const redOptions = { color: "red" };

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: requirePropFactory("./assets/icons/dogemoji.png"),
    iconSize: _iconSize,
  });
}

export default function Map({ posts }) {
  return (
    <div id="map">
      <MapContainer className="map" center={[47.606, -122.332]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        {console.log(posts, "user posts")}
        {/* {posts.map((post) => {
          <Marker key={post.id} position={[post.post_latitude, post.post_longitude]} icon={GetIcon(20)}>
            <Popup>{post.post_title}</Popup>
          </Marker>;
        })} */}
        <React.Fragment>
            {posts.map(post => post.post_latitude?<Marker position={[post?.post_latitude, post?.post_longitude]} > <Popup>{post?.post_title}</Popup> </Marker>:null)}
        </React.Fragment>
        {/* Below works, du ma. */}
        {/* <Marker position={[47.606, -122.329]}>
          <Popup>
            Chilling with my doggo, come hang! <br /> 5PM
          </Popup>
        </Marker>
        <Marker position={[47.606, -122.319]}>
          <Popup>
            Chilling with my doggo, come hang! <br /> 5PM
          </Popup>
        </Marker>
        <Marker position={[47.606, -122.339]}>
          <Popup>
            Chilling with my doggo, come hang! <br /> 5PM
          </Popup>
        </Marker> */}

        {/* <Marker position={[47.606, -122.331]}>
          <Popup>
            Pet my cat! <br /> 3PM
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}
