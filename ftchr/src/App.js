import React from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";

function App() {
  return (
    <div className="App">
      <h1 className=""></h1>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
        <SignUp />
      </BrowserRouter>
    </div>
  );
}

export default App;
