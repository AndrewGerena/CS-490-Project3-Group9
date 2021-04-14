import React from "react";
import { useState, useRef, useEffect } from "react";
import './App.css';
import io from "socket.io-client";



const socket = io();


function App() {
  return (
    <div className="App">
      <h1>Project 3 has started!</h1>
    </div>
  );
}

export default App;
