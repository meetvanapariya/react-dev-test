import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ModalA from "./components/modalA/ModalA";
import ModalB from "./components/modalB/ModalB";
import ModalC from "./components/modalC/ModalC";
import Home from "./components/home/home";

import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/modal-a" element={<ModalA />} />
        <Route path="/modal-b" element={<ModalB />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
