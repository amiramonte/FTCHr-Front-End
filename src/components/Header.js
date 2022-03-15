import React from "react";
import "../styles/style.css";
import Navbar from "./Navbar";
import Navlogo from "../assets/navlogo.png";

function Header({setLoggedIn}) {
  return (
    <section class="">
        <div>
          <img src={Navlogo}></img>
          <div>
            <Navbar setLoggedIn={setLoggedIn}/>
          </div>
        </div>
    </section>
  );
}

export default Header;