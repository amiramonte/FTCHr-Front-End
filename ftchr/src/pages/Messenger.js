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
  const [arrivedMessage, setArrivedNewMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

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
    const members = [currentChat.senderId, currentChat.recieverId]
    const recieverId = members.find(person => person !== user);

    socket.current.emit("sendMessage", {
      senderId: user, 
      recieverId: recieverId,
      text: newMessage
    })

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

  // to connnect to socketio server
  useEffect(() => {
// need to fix with user login later
    const user = "truont2";
    // socket.current.emit("addUser", user.id)
    socket.current.emit("addUser", user)
    socket.current.on("getUsers", users => {
      console.log(users)
    })

  }, [user])

  // connect to server just once when the page loads
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on('getMessage', (data) => {
      setArrivedNewMessage({
        data: senderId, 
        text: data.text, 
        createdAt: Date.now()
      })
    })
  },[])

  useEffect(() => {
    const members = [currentChat.senderId, currentChat.recieverId]
    arrivedMessage && members.includes(arrivedMessage.sender) && setMessages(prev => [...prev, arrivedMessage])
  }, [arrivedMessage, currentChat])

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
