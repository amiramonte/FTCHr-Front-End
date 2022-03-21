import React, { useEffect, useState, useRef } from "react";
import "../styles/messenger.css";
import Conversations from "../components/Conversation/Conversation";
import Message from "../components/message/Message";
import ChatOnline from "../components/chatOnline/ChatOnline";
import axios from "axios";
import io from "socket.io-client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import prefixURL from "../utils/helper";
import Footer from "../components/Footer";

export default function Messenger({ user }) {
  const [token, setToken] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalNewMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // for the autocomplete form to create a new conversation
  const [value, setValue] = React.useState(allUsers[0]);
  const [inputValue, setInputValue] = React.useState("");
  const scrollRef = useRef();
  const socket = useRef();

  // connect to the socket server
  useEffect(() => {
    // put deployed socket io heroku page here
    socket.current = io("https://ftchr-socket-io.herokuapp.com/");

    // LOCAL
    // socket.current = io("http://localhost:4000", {
    //   credentials: true,
    // });

    socket.current.on(
      "getMessage",
      (data) => {
        console.log(data, "data");
        setArrivalNewMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      },
      []
    );

    // get current logged in user through the toke

    // on page load, need to fetch all users, and set them as a state variable which is then passed into the combo box to render as options
    const getAllUsers = async () => {
      try {
        // request gets all users
        const response = await axios.get(`${prefixURL}/api/user/getallusers`);
        const userArr = response.data.map((userobj) => userobj.user_name);
        console.log(userArr, "user array ");
        setAllUsers(userArr);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    const members = [currentChat?.senderId, currentChat?.recieverId];
    arrivalMessage &&
      members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    console.log(user.user_name, "current logged in user");
    if (user.user_name !== "") {
      socket.current.emit("addUser", user.user_name);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(users);
        console.log(users, "connected users");
      });
    }
  }, [user]);

  // need to grab the data of the current loggedIn user
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `${prefixURL}/api/conversations/` + user.user_name
        );
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
          `${prefixURL}/api/messages/` + currentChat?.id
        );
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // function runs when the send message is pressed
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.user_name,
      text: newMessage,
      conversationId: currentChat.id,
    };
    const members = [currentChat.senderId, currentChat.recieverId];
    const recieverId = members.find((person) => person !== user.user_name);

    socket.current.emit("sendMessage", {
      senderId: user.user_name,
      recieverId,
      text: newMessage,
    });

    try {
      const response = await axios.post(`${prefixURL}/api/messages`, message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // makes the page scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // function to create a new conversation
  const createConversation = async () => {
    const convo = {
      senderId: user.user_name,
      recieverId: value,
    };

    try {
      console.log(convo, "conversation");
      // just need to add to conversation and re render the page?
      const response = await axios.post(
        `${prefixURL}/api/conversations`,
        convo
      );
      console.log(response.data.recieverId, "conversation created");
      setConversations([...conversations, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          {/* <input placeholder="Search for Friends" className="chatMenuInput" />  */}
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={allUsers}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Select a User to chat with"
              />
            )}
          />
          <Button
            class="commentButton"
            variant="contained"
            style={{ margin: "5px 0px" }}
            onClick={createConversation}
          >
            Create Conversation
          </Button>
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
                  console.log(message, "user messages");
                  return (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user.user_name}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  placeholder="write something"
                  className="chatMessageInput"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Hello, {user.user_name}
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user.user_name}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
