import React from 'react'
import './conversation.css'
import image from '../../images/naruto.jpg';

export default function Conversations() {
  return (
    <div className='conversation'>
      <img className='conversationImg' src={image} alt="something" />
      <span className='conversationName'>John Doe</span>
    </div>
  )
}

