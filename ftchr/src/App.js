import React from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import {Routes, Route, BrowserRouter} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1 className=""></h1>
      <BrowserRouter>
        <Header />
          <Routes></Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
