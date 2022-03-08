import React from "react";
import "../styles/messenger.css";
import Conversations from "../components/Conversation/Conversation";
import Message from "../components/message/Message"
import ChatOnline from "../components/chatOnline/ChatOnline";

export default function Messenger() {
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
            <input placeholder="Search for Friends" className="chatMenuInput"/>
            <div><Conversations /></div>
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
            <div className="chatBoxTop">
                <Message />
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message own={true}/>
                <Message own={true}/>
                <Message own={true}/>
                <Message own={true}/>
                <Message own={true}/>
                <Message own={true}/>
                <Message own={true}/>
                
            </div>
            <div className="chatBoxBottom">
                <textarea placeholder="write something" className="chatMessageInput"></textarea>
                <button className="chatSubmitButton">Send</button>
            </div>
            
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
