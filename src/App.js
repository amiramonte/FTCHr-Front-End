import React, { useState, useEffect } from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Messenger from "./pages/Messenger.js";
import Home from "./pages/Home";
import About from "./pages/About";

// import  user useCOntext onto this page then wrap all the components with the provider
// in the context api, grab username from token
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import axios from "axios";
import prefixURL from "./utils/helper";

function App() {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
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

  if (!token)  {
    return <Login setLoggedIn={setLoggedIn} />
  }

  return (
    <div className="App">
      <BrowserRouter>
        {token !== "" && <Header setLoggedIn={setLoggedIn} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} setToken={setToken} />}/>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          {token !== "" ?
          <>
            <Route path="/messenger" element={<Messenger user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/profile" element={<Profile />} />
          </> 
          : <Route
          path="*"
          element={
            <Home />
          }
        />}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
