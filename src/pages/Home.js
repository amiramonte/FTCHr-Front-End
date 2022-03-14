import React from 'react'
import erwin from '../images/erwin.jpg'

export default function Home() {
  return (
    <div>
        
        Shinzou wo Sasageyo!
        <img src={erwin}/>
        <a href="/signup">Join the Scouts</a>
        <a href="/login">Die a Scout</a>
    </div>
  )
}
