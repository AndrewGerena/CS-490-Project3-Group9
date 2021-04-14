import React from "react";
import { useState, useRef, useEffect } from "react";
import './App.css';
import io from "socket.io-client";

const socket = io();

function App() { 
  const User_Input_Ref = useRef(null);
  const [DisplayNewsHeadlines, setDisplayNewsHeadlines] = useState([]);
  const [DisplayNewsSnippet, setDisplayNewsSnippet] = useState([]);
  
  
  function User_Search() {
    if (User_Input_Ref != null) {
      let Curr_Search = User_Input_Ref.current.value;
      console.log("The User Searched: " + Curr_Search);
      socket.emit("User_Searched_Topic", {User_Searched: Curr_Search});
      
    }
  }
  
   useEffect(() => {
    socket.on("Answer_Searched_Topic", (Fetched_Data) => {
      console.log("These are the NEWs headlines: " + Fetched_Data['Headlines']);
      setDisplayNewsHeadlines((prevDisplayNewsHeadlines) => [...Fetched_Data['Headlines']]);
      
      console.log("These are the NEWs snippets: " + Fetched_Data['Snippets']);
      setDisplayNewsSnippet((prevDisplayNewsSnippet) => [...Fetched_Data['Snippets']]);
      
    });
  }, []);
  
  
  const Show_NewsHeadlines = Array();
  const Show_NewsSnippets = Array();
  for (let i = 0; i < DisplayNewsHeadlines.length; i++) {
      console.log(DisplayNewsHeadlines[i]);
      Show_NewsHeadlines.push(
          <li>NEWS #{i} : {DisplayNewsHeadlines[i]}</li>
      );
      console.log(DisplayNewsSnippet[i]);
      Show_NewsSnippets.push(
          <li>Snippet #{i} : {DisplayNewsSnippet[i]}</li>
      );
  }
      

  // <div>{Show_NewsHeadlines}</div>
    console.log("Data in Display NEWS " + DisplayNewsHeadlines);
    console.log("Data in Display Sneppits " + DisplayNewsSnippet);
  
  return (
    <div className="App">
      <h1>Project 3 has started!</h1>
       <input id="Form_Input" type="text" ref={User_Input_Ref} />
      <button id="Form_Btn" type="Submit" onClick={User_Search}>Submit</button>
      <h1>The Requested news: </h1>
      <div>{Show_NewsHeadlines}</div>
      <div>{Show_NewsSnippets}</div>
    </div>
    
  );

}

export default App;
