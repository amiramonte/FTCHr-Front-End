import React from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Messenger from "./pages/Messenger.js";
import {Routes, Route, BrowserRouter} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1 className=""></h1>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route exact path="/" element={<Messenger />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
