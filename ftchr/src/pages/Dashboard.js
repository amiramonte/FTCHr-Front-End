import React from "react";
import Postcard from "../components/Postcard";
import Map from "../components/Map";

export default function Dashboard() {
  return (
    <div>
      <div>
        <Postcard />
        <Postcard />
        <Postcard />
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
}
