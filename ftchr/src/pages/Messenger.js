import React, { useEffect, useState, useRef, useContext } from "react";
import "../styles/messenger.css";
import Conversations from "../components/Conversation/Conversation";
import Message from "../components/message/Message";
import ChatOnline from "../components/chatOnline/ChatOnline";
import axios from "axios";
import io from 'socket.io-client';

import { UserContext } from "../components/context/UserContext";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef();

  // const { user } = useContext(UserContext)

  // need to grab the data of the current loggedIn user
  const user = "truont2";
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/conversations/" + user
        );
        setConversations(response.data);
      } catch (err) {
        console.log(err, "fetch err");
      }
    };

    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/messages/" + currentChat?.id
        );
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      // user rn but nneed to update to user,username later
      senderId: user,
      text: newMessage, 
      conversationId: currentChat.id
    }

    try {
      const response = await axios.post("http://localhost:3001/api/messages", message)
      setMessages([...messages, response.data])
      setNewMessage('');
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  useEffect(() => {
    setSocket(io("ws://localhost:8900"))
  },[])

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for Friends" className="chatMenuInput" />
          {conversations.map((convo) => {
            console.log(convo);
            // need to  pass in user prop later
            return (
              <div
                onClick={() => {
                  setCurrentChat(convo);
                }}
              >
                <Conversations
                  key={convo.id}
                  conversation={convo}
                  currentUser={user}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((message) => {
                  return (
                  <div red={scrollRef}> 
                    <Message message={message} own={message.sender === user}/>
                  </div>
                  )
                })}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  placeholder="write something"
                  className="chatMessageInput"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}
