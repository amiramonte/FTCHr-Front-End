import React from 'react'
import './chatOnline.css'
import image from '../../images/naruto.jpg';

export default function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className='chatOnlineImgContainer'>
                <img className="chatOnlineImg" src={image} alt="naruto"/>
                <div className='chatOnlineBadge'></div>
            </div>
            <span className='chatOnlineName'>naruto</span>
        </div>
    </div>
  )
}
