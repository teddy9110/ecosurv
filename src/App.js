import React from "react";
import "./App.css";

// import Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Component
import Header from "./component/Header";

// import Pages
import Home from "./component/Home";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Header />
        <div class="container-full p-4">
          <Home />
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;