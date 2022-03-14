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
import L, { map } from "leaflet";
import { Icon } from "leaflet";
import "../styles/style.css";
import { requirePropFactory } from "@mui/material";
import { useEffect, useState } from "react";

function Fly({center}) {
  console.log(center, "center");
  const map = useMap();
  map.setView(center);
  return null;
}

export default function Map({ posts, currentPost }) {
  // console.log(currentPost ? [currentPost?.post_latitude, currentPost?.post_longitude]: [posts[0]?.post_latitude, posts[0]?.post_longitude],"Yoooo" )
  const redOptions = { color: "red" };

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: requirePropFactory("./assets/icons/dogemoji.png"),
    iconSize: _iconSize,
  });
}
const [latLong, setLatLong] = useState([47.606, -122.329]);

// function renderMap(){
//   return (
// <div id="map">
//     {console.log(latLong, "latlong inside component")}
//       <MapContainer className="map" center={latLong} zoom={15}>
        
//         <TileLayer
//           attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//           url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
//         />
//         {console.log(posts, "user posts")}
//         <Fly center={latLong}/>
//         <React.Fragment >
//             {posts.map(post => <Marker key={post.id} position={[post.post_latitude, post.post_longitude]} > <Popup>{post.post_title}</Popup> </Marker>)}
//         </React.Fragment>
//       </MapContainer>
//     </div>
//   )
// }
// const map = useMap();
// map.setCenter([currentPost?.post_latitude || 47.606, currentPost?.post_longitude || -122.329]);
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
        <React.Fragment >
            {posts.map(post => <Marker key={post.id} position={[post.post_latitude, post.post_longitude]} > <Popup>{post.post_title}</Popup> </Marker>)}
        </React.Fragment>
      </MapContainer>
    </div>
  );
}
