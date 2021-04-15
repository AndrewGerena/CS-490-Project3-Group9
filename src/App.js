import React from "react";
import { useState, useRef, useEffect } from "react";
import './App.css';
import io from "socket.io-client";

const socket = io();

function App() { 
  const User_Input_Ref = useRef(null);
  const [DisplayNewsHeadlines, setDisplayNewsHeadlines] = useState([]);
  const [DisplayNewsSnippet, setDisplayNewsSnippet] = useState([]);
  const [DisplayNewsDate, setDisplayNewsDate] = useState([]);
  const [DisplayNewsURL, setDisplayNewsURL] = useState([]);
  const [DisplayNewsAuthor, setDisplayNewsAuthor,] = useState([]);
  const [News_Topic, setNews_Topic] = useState("");
  
  function User_Search() {
    if (User_Input_Ref != null) {
      let Curr_Search = User_Input_Ref.current.value;
      setNews_Topic(Curr_Search);
      console.log("The User Searched: " + Curr_Search);
      socket.emit("User_Searched_Topic", {User_Searched: Curr_Search});
      
    }
  }
  
   useEffect(() => {
    socket.on("Answer_Searched_Topic", (Fetched_Data) => {
      console.log("These are the article Headlines: " + Fetched_Data['Headlines']);
      setDisplayNewsHeadlines(Fetched_Data['Headlines']);
      
      console.log("These are the article Snippets: " + Fetched_Data['Snippets']);
      setDisplayNewsSnippet(Fetched_Data['Snippets']);
      
      console.log("These are the article Dates: " + Fetched_Data['Date']);
      setDisplayNewsDate(Fetched_Data['Date']);
      
      console.log("These are the article URLS: " + Fetched_Data['URL']);
      setDisplayNewsURL(Fetched_Data['URL']);
      
      console.log("These are the article Authors: " + Fetched_Data['Author']);
      setDisplayNewsAuthor(Fetched_Data['Author']);
      
    });
  }, []);
  
  
  const Show_NewsHeadlines = Array();
  const Show_NewsSnippets = Array();
  const Show_NewsDates = Array();
  const Show_NewsURL = Array();
  const Show_NewsAuthor = Array();
  
  
  
  for (let i = 0; i < DisplayNewsHeadlines.length; i++) {
      console.log(DisplayNewsHeadlines[i]);
      Show_NewsHeadlines.push(
          <li>NEWS #{i} : {DisplayNewsHeadlines[i]}</li>
      );
      console.log(DisplayNewsSnippet[i]);
      Show_NewsSnippets.push(
          <li>Snippet #{i} : {DisplayNewsSnippet[i]}</li>
      );
      console.log(DisplayNewsDate[i]);
      Show_NewsDates.push(
          <li>Date #{i} : {DisplayNewsDate[i]}</li>
      );
      console.log(DisplayNewsURL[i]);
      Show_NewsURL.push(
          <li>URL #{i} : {DisplayNewsURL[i]}</li>
      );
      console.log(DisplayNewsAuthor[i]);
      Show_NewsAuthor.push(
          <li>Author #{i} : {DisplayNewsAuthor[i]}</li>
      );
  }
      

  return (
    <div className="App">
      <h1>Project 3 has started!</h1>
       <input id="Form_Input" type="text" ref={User_Input_Ref} />
      <button id="Form_Btn" type="Submit" onClick={User_Search}>Submit</button>
      <h1>THE NEWS TOPIC: {News_Topic} </h1>
      <div>{Show_NewsHeadlines}</div>
      <hr/>
      <div>{Show_NewsSnippets}</div>
      <hr/>
      <div>{Show_NewsDates}</div>
      <hr/>
      <div>{Show_NewsURL}</div>
      <hr/>
      <div>{Show_NewsAuthor}</div>
    </div>
    
  );

}

export default App;
