import React, {useState} from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Messenger from "./pages/Messenger.js";
import Login from './pages/Login';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";

// import  user useCOntext onto this page then wrap all the components with the provider
// in the context api, grab username from token 

function App() {
  const[user, setUser] = useState("");
  return (
    <div className="App">
      <h1 className=""></h1>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route exact path="/" element={<Messenger />} />
            {/* <Route exact path="/" element={<Login />} /> */}
          </Routes>
        <Footer />
        <SignUp />
      </BrowserRouter>
    </div>
  );
}

export default App;
