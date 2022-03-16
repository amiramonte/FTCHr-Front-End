import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
  useMap
} from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import "../styles/style.css";
import { requirePropFactory } from "@mui/material";
import { useEffect, useState } from "react";

const redOptions = { color: "red" };

export default function Map({ currentPost, posts }) {
  function Fly({center}) {
    console.log(center, "center");
    const map = useMap();
    map.setView(center);
    return null;
  }

  const [latLong, setLatLong] = useState([47.606, -122.329]);

  useEffect(()=>{
    setLatLong([currentPost?.post_latitude || latLong[0], currentPost?.post_longitude || latLong[1]])
    console.log(latLong,"map")  
    // return renderMap()
  },[currentPost])                                  
  

  return (
    <div id="map">
      <MapContainer className="map" center={latLong} zoom={15}>
      <Fly center={latLong}/>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        {console.log(posts, "user posts")}
        <React.Fragment>
            {posts.map(post => post.post_latitude?<Marker key ={[post?.post_latitude, post?.post_longitude]} position={[post?.post_latitude, post?.post_longitude]} > <Popup>{post?.post_title}</Popup> </Marker>:null)}
        </React.Fragment>
      </MapContainer>
    </div>
  );
}
