import React from 'react'
import Logo from '../assets/logowithphrase.png'

export default function Home() {
  return (
    <div className='homeStyle' >
        <img src={Logo}
        alt="A dog and a cat in a circle"/>
        <p>
        <a href="/signup">Sign up</a>   
        <a href="/login"> or Login </a>
        to join the fun!</p>
    </div>
  )
}
