import React, { useState, useEffect } from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Messenger from "./pages/Messenger.js";
import Home from './pages/Home'

// import  user useCOntext onto this page then wrap all the components with the provider
// in the context api, grab username from token
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import axios from "axios";
import prefixURL from "../utils/helper.js";

function App() {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({
    user_id: 0,
    user_name: "",
  });
  // grab user data from token
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    fetch(`${prefixURL}/api/user/verifieduser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${savedToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          console.log(data, "data from the verified route");
          setToken(savedToken);
          setUser({
            user_id: data.id,
            user_name: data.user_name,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {<Header setLoggedIn={setLoggedIn}/>}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/messenger" element={<Messenger user={user}/>} />
          <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} setToken={setToken}/>} />
          <Route path="/dashboard" element={(<Dashboard/>)} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
