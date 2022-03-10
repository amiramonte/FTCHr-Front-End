import React, { useEffect, useState, useRef, useContext } from "react";
import "../styles/messenger.css";
import Conversations from "../components/Conversation/Conversation";
import Message from "../components/message/Message";
import ChatOnline from "../components/chatOnline/ChatOnline";
import axios from "axios";
import io from 'socket.io-client';
import ComboBox from "../components/newConversationform.js/newConversation";

import { UserContext } from "../components/context/UserContext";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalNewMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  // only for testing
  const [user, setUser] = useState({
    user_name: "truont2",
    user_email: "truont2@gmail.com",
    user_password: "password2",
  })

  // const { user } = useContext(UserContext)

    // connect to server just once when the page loads
    useEffect(() => {
      socket.current = io("ws://localhost:8900");
      socket.current.on('getMessage', (data) => {
        console.log(data,"data");
        setArrivalNewMessage({
          sender: data.senderId, 
          text: data.text, 
          createdAt: Date.now()
        })
      })

      // on page load, need to fetch all users, and set them as a state variable which is then passed into the combo box to render as options
    },[])

    useEffect(() => {
      const members = [currentChat?.senderId, currentChat?.recieverId]
      arrivalMessage && members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
      // need to fix with user login later
      console.log(user.user_name,"current logged in user")
          socket.current.emit("addUser", user.user_name)
          socket.current.on("getUsers", users => {
            setOnlineUsers(users)
          })
      
        }, [user])

  // need to grab the data of the current loggedIn user
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/conversations/" + user.user_name
        );
        console.log(response,"conversation response")
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.user_name]);

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
      sender: user.user_name,
      text: newMessage, 
      conversationId: currentChat.id
    }
    const members = [currentChat.senderId, currentChat.recieverId]
    const recieverId = members.find(person => person !== user.user_name);

    socket.current.emit("sendMessage", {
      senderId: user.user_name, 
      recieverId,
      text: newMessage,
    })

    try {
      const response = await axios.post("http://localhost:3001/api/messages", message)
      setConversations([...conversations, response.data])
    } catch(err) {
      console.log(err)
    }
  }


  useEffect(()=> {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  const createConversation = async (currentUser, recieverId) => {
    const convo = {
      senderId: currentUser, 
      recieverId
    }

    try {
      // just need to add to conversation and re render the page?
      const response = await axios.post("http://localhost:3001/api/conversations", convo)
      setMessages([...messages, response.data])
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for Friends" className="chatMenuInput" />
          <ComboBox />
          <button onClick={createConversation}> Create a new conversation</button>
          {conversations.map((convo) => {
            // console.log(convo);
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
                  console.log(message, "user messages")
                  return (
                  <div ref={scrollRef}> 
                    <Message message={message} own={message.sender === user.user_name}/>
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
          <ChatOnline onlineUsers={onlineUsers} currentId={user.user_name} setCurrentChat={setCurrentChat}/>
        </div>
      </div>
    </div>
  );
}
