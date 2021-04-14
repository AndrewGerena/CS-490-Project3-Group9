import React from "react";
import { useState, useRef, useEffect } from "react";
import './App.css';
import io from "socket.io-client";

const socket = io();


function App() { 
  const User_Input_Ref = useRef(null);
  
  function User_Search() {
    if (User_Input_Ref != null) {
      let Curr_Search = User_Input_Ref.current.value;
      console.log("The User Searched: " + Curr_Search);
      socket.emit("User_Searched_Topic", {User_Searched: Curr_Search});
      
    }
  }
  
  return (
    <div className="App">
      <h1>Project 3 has started!</h1>
       <input id="Form_Input" type="text" ref={User_Input_Ref} />
      <button id="Form_Btn" type="Submit" onClick={User_Search}>Submit</button>
    </div>
    
  );

}

export default App;
