import React, {useState, useEffect} from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Messenger from "./pages/Messenger.js";

// import  user useCOntext onto this page then wrap all the components with the provider
// in the context api, grab username from token 
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import axios from "axios";

function App() {
  const [user, setUser] = useState({})
  useEffect(() => {
    // /verifieduser
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user/verifieduser"
        );
        console.log(response, "user data response");
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentUser();
  }, []);
  return (
    <div className="App">
      <h1 className=""></h1>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/messenger" element={<Messenger />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
