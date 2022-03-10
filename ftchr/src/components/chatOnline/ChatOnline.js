import React, {useEffect, useState} from 'react'
import './chatOnline.css'
import image from '../../images/naruto.jpg';
import axios from 'axios';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async() => {
      const response = axios.get()
    }
  }, [])

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
