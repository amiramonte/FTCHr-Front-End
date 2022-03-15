import React from "react";
import "../styles/style.css";
import Navbar from "./Navbar";

function Header({setLoggedIn}) {
  return (
    <section >
        <div><h1>FTCHr</h1>
          <div >
            <Navbar setLoggedIn={setLoggedIn}/>
          </div>
        </div>
    </section>
  );
}

export default Header;