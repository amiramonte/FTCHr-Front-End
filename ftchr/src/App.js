import React, {useState} from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Messenger from "./pages/Messenger.js";

// import  user useCOntext onto this page then wrap all the components with the provider
// in the context api, grab username from token 
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Dashboard from "./pages/Dashboard.js";
import {userContext, UserContextProvider } from './components/context/UserContext'

function App() {
  const[user, setUser] = useState("");
  return (
    <userContext>
      <div className="App">
        <h1 className=""></h1>
        <BrowserRouter>
          <Header />
            <Routes>
              <Route exact path="/" element={<Messenger />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp /> } />
            </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </userContext>
  );
}

export default App;
