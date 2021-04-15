import React from "react";
import { useState, useRef, useEffect } from "react";
import './App.css';
import io from "socket.io-client";

const socket = io();

function App() { 
  // Reading Inputs
  const News_Topic_User_Input = useRef(null);
  const Covid__Country_User_Input = useRef(null);
  
  //For NEWs Section
  const [DisplayNewsHeadlines, setDisplayNewsHeadlines] = useState([]);
  const [DisplayNewsSnippet, setDisplayNewsSnippet] = useState([]);
  const [DisplayNewsDate, setDisplayNewsDate] = useState([]);
  const [DisplayNewsURL, setDisplayNewsURL] = useState([]);
  const [DisplayNewsAuthor, setDisplayNewsAuthor] = useState([]);
  const [News_Topic, setNews_Topic] = useState("");
  
  //For Covid Section
  const [DisplayCovidDate, setDisplayCovidDate] = useState([]);
  const [DisplayCovidTotalCases, setDisplayCovidTotalCases] = useState([]);
  const [DisplayCovidNewCases, setDisplayCovidNewCases] = useState([]);
  const [DisplayCovidTotalDeaths, setDisplayCovidTotalDeaths] = useState([]);
  const [DisplayCovidNewDeaths, setDisplayCovidNewDeaths] = useState([]);
  const [DisplayCovidTotalRecovered, setDisplayCovidTotalRecovered] = useState([]);
  const [DisplayCovidNewRecovered, setDisplayCovidNewRecovered] = useState([]);
  const [Country_Input, setCountry_Input] = useState("");
  

  
  function User_News_Topic_Search() {
    if (News_Topic_User_Input != null) {
      let Curr_News_Search = News_Topic_User_Input.current.value;
      setNews_Topic(Curr_News_Search);
      console.log("The User Searched NEWs Topic: " + Curr_News_Search);
      socket.emit('User_Searched_News_Topic', {News_Topic_Searched: Curr_News_Search});
      
    }
  }
  
  function User_Covid_Country_Search(){
    if (Covid__Country_User_Input != null) {
      let Curr_Country_Search = Covid__Country_User_Input.current.value;
      setCountry_Input(Curr_Country_Search);
      console.log("The User Searched Covid Country: " + Curr_Country_Search);
      socket.emit('User_Searched_Covid_Country', {Covid_Country_Searched: Curr_Country_Search});
    }
  }
  
   useEffect(() => {
    socket.on("Answer_Searched_News_Topic", (Fetched_News_Data) => {
      console.log("These are the article Headlines: " + Fetched_News_Data['Headlines']);
      setDisplayNewsHeadlines(Fetched_News_Data['Headlines']);
      
      console.log("These are the article Snippets: " + Fetched_News_Data['Snippets']);
      setDisplayNewsSnippet(Fetched_News_Data['Snippets']);
      
      console.log("These are the article Dates: " + Fetched_News_Data['Date']);
      setDisplayNewsDate(Fetched_News_Data['Date']);
      
      console.log("These are the article URLS: " + Fetched_News_Data['URL']);
      setDisplayNewsURL(Fetched_News_Data['URL']);
      
      console.log("These are the article Authors: " + Fetched_News_Data['Author']);
      setDisplayNewsAuthor(Fetched_News_Data['Author']);
    });
    
    socket.on("Answer_Searched_Covid_Country", (Fetched_Country_Data) => {
      console.log("Latest Covid Stats Date: " + Fetched_Country_Data['Date']);
      setDisplayCovidDate(Fetched_Country_Data['Date']);
      
      console.log("Total Covid Cases: " + Fetched_Country_Data['TotalCases']);
      setDisplayCovidTotalCases(Fetched_Country_Data['TotalCases']);
      
      console.log("New Covid Cases: " + Fetched_Country_Data['NewCases']);
      setDisplayCovidNewCases(Fetched_Country_Data['NewCases']);
      
      console.log("Total Covid Deaths: " + Fetched_Country_Data['TotalDeaths']);
      setDisplayCovidTotalDeaths(Fetched_Country_Data['TotalDeaths']);
      
      console.log("New Covid Deaths: " + Fetched_Country_Data['NewDeaths']);
      setDisplayCovidNewDeaths(Fetched_Country_Data['NewDeaths']);
      
      console.log("Total Covid Recoveries: " + Fetched_Country_Data['TotalRecovered']);
      setDisplayCovidTotalRecovered(Fetched_Country_Data['TotalRecovered']);
      
      console.log("New Covid Recoveries: " + Fetched_Country_Data['NewRecovered']);
      setDisplayCovidNewRecovered(Fetched_Country_Data['NewRecovered']);
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
       <input id="Form_Input" type="text" ref={News_Topic_User_Input} />
      <button id="Form_Btn" type="Submit" onClick={User_News_Topic_Search}>Submit</button>
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
    
      <hr/>
      <input id="Form_Input_Covid" type="text" ref={Covid__Country_User_Input} />
      <button id="Form_Btn_Covid" type="Submit" onClick={User_Covid_Country_Search}>Submit</button>
      <h1>Covid Stats For: {Country_Input} </h1>
      <div><li> As Of Date: {DisplayCovidDate}</li></div>
      <div><li> Total Cases: {DisplayCovidTotalCases}</li></div>
      <div><li> New Cases: {DisplayCovidNewCases}</li></div>
      <div><li> Total Deaths: {DisplayCovidTotalDeaths}</li></div>
      <div><li> New Deaths: {DisplayCovidNewDeaths}</li></div>
      <div><li> Total Recoveries: {DisplayCovidTotalRecovered}</li></div>
      <div><li> New Recoveries: {DisplayCovidNewRecovered}</li></div>
    </div>
    
  );

}

export default App;