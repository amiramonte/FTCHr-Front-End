import React from "react";
import Logo from '../assets/logowithphrasetrimmed.png'

export default function About() {
    return (
      <div className='homeStyle' >
          <img src={Logo}
          alt="A dog and a cat in a circle"/>
          <p>We wanted to help create and harbor a community for people to connect with other people lovers localy to help socialize. Weather it be socializing with other people, pets or pet rocks, everyone deservse a friend.</p>

          <p>Lovingly created by:</p>
          <a href="https://github.com/AndrewTranMSW">Andrew Tran</a> 
          <a href="https://github.com/amiramonte">Alex Miramontes</a>
          <a href="https://github.com/truont2">Takara Truong</a>
          <a href="https://github.com/Acanthodoris">Rebeccah Mullan</a>
      </div>
    )
  }