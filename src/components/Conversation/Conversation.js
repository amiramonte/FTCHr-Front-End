import React, { useState, useEffect } from "react";
import "./conversation.css";
import image from "../../assets/tinylogo.png";
import axios from "axios";
import prefixURL from "../../utils/helper";

export default function Conversations({ conversation, currentUser }) {
  const members = [conversation.senderId, conversation.recieverId];
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = members.find((person) => person !== currentUser.user_name);
    // const friendId = members.find(person => person !== currentUser.id )
    console.log(friendId, "friend id who you are chatting with");
    // const friendId = "amiramonte"
    const getUser = async () => {
      try {
        const response = await axios(
          `${prefixURL}/api/user/getuser/${friendId}`
        );
        // const response = await axios.get('http://localhost:3001/api/user/getuser/amiramonte')
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  console.log(currentUser, "current user ");
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        // src={user?.user_photo ? user.user_photo : image}
        src={user?.user_photo ? user.user_photo : image}
        alt="something"
      />
      {/* <span className='conversationName'>{`${conversation.senderId}, ${conversation.recieverId} `}</span> */}
      <span className="conversationName">{user?.user_name}</span>
    </div>
  );
}
