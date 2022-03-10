import React from "react";
import Postcard from "../components/Postcard";
import Map from "../components/Map";
import "../styles/style.css";

export default function Dashboard() {
  return (
    <div className="dashboard-flex flex-row">
      <div className="postcards">
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
