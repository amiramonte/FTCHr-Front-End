import React from 'react'
import image from "../../assets/tinylogo.png";
import './message.css'
import moment from 'moment';

export default function Message({message, own}) {
  return (
    <div>
        <div className={own ? "message own" : "message"}>
            <div className='messageTop'>
                <img className='messageImg' src={image} alt="naruto"/>
                <p className='messageText'>{message.text}</p>
            </div>
            <div className='messageBottom'>
                {moment(message.createdAt).fromNow()}
            </div>
        </div>
    </div>
  )
}
