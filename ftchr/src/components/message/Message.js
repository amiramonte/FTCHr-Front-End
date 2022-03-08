import React from 'react'
import image from '../../images/naruto.jpg';
import './message.css'

export default function Message({own}) {
  return (
    <div>
        <div className={own ? "message own" : "message"}>
            <div className='messageTop'>
                <img className='messageImg' src={image} alt="naruto"/>
                <p className='messageText'>This is a message</p>
            </div>
            <div className='messageBottom'>
                1 hour ago
            </div>
        </div>
    </div>
  )
}
