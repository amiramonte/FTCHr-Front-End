import React, {useEffect, useState} from 'react'
import './chatOnline.css'
import image from  "../../assets/tinylogo.png";
import axios from 'axios';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async() => {
      const response = axios.get()
    }
  }, [currentId])

  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className='chatOnlineImgContainer'>
                <img className="chatOnlineImg" src={image} alt="naruto"/>
                <div className='chatOnlineBadge'></div>
            </div>
            <span className='chatOnlineName'>FTCHr Team</span>
        </div>
    </div>
  )
}
