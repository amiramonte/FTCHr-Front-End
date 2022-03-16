import React from "react";
import Logo from '../assets/logowithphrasetrimmed.png'
import Footer from "../components/Footer";

export default function About() {
    return (
      <div className='homeStyle' >
          <img src={Logo}
          alt="A dog and a cat in a circle"/>
          <h5>We wanted to help create and harbor a community for people to connect with other people lovers localy to help socialize. Weather it be socializing with other people, pets or pet rocks, everyone deservse a friend.</h5>
          <br/>
          <p>Lovingly created by:</p>
          <br/>
          <a href="https://github.com/AndrewTranMSW">Andrew Tran</a> 
          <a href="https://github.com/amiramonte">Alex Miramontes</a>
          <a href="https://github.com/truont2">Takara Truong</a>
          <a href="https://github.com/Acanthodoris">Rebeccah Mullan</a>
        <Footer />
      </div>

    )
  }