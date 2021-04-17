import React from "react";
import { useState, useRef, useEffect } from "react";
import './App.css';
import io from "socket.io-client";
import { News_Card } from "./News_Cards.js";
import { Covid_Card } from "./Covid_Cards.js";

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
  const [News_Topic, setNews_Topic] = useState("Global");
  
  //For Covid Section
  const [DisplayCovidDate, setDisplayCovidDate] = useState([]);
  const [DisplayCovidTotalCases, setDisplayCovidTotalCases] = useState([]);
  const [DisplayCovidNewCases, setDisplayCovidNewCases] = useState([]);
  const [DisplayCovidTotalDeaths, setDisplayCovidTotalDeaths] = useState([]);
  const [DisplayCovidNewDeaths, setDisplayCovidNewDeaths] = useState([]);
  const [DisplayCovidTotalRecovered, setDisplayCovidTotalRecovered] = useState([]);
  const [DisplayCovidNewRecovered, setDisplayCovidNewRecovered] = useState([]);
  const [Country_Input, setCountry_Input] = useState("Global");
  
  window.onload = function (){
    socket.emit('Onload_News_Headlines');
    socket.emit('Onload_Covid_Global'); 
  }
  
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

     
    //--------------Answering User Asked News topic------------------------------
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
    
    //------------- Answering User Asked Covid Data----------------------- 
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
      <News_Card News_Headlines={Show_NewsHeadlines} News_Info={Show_NewsSnippets} News_Date={Show_NewsDates} News_Url={Show_NewsURL} News_Author= {Show_NewsAuthor}/>


    
      <hr/>
      <input id="Form_Input_Covid" type="text" ref={Covid__Country_User_Input} />
      <button id="Form_Btn_Covid" type="Submit" onClick={User_Covid_Country_Search}>Submit</button>
      <h1>Covid Stats For: {Country_Input} </h1>
      <Covid_Card Covid_Date={DisplayCovidDate} Covid_TotalCases={DisplayCovidTotalCases} Covid_NewCases={DisplayCovidNewCases} Covid_TotalDeaths={DisplayCovidTotalDeaths} Covid_NewDeaths= {DisplayCovidNewDeaths}  Covid_TotalRecovered={DisplayCovidTotalRecovered} Covid_NewRecovered={DisplayCovidNewRecovered}/>
    </div>
    
  );

}

export default App;


      // <News_Card News_Headlines={Show_NewsHeadlines[0]} News_Info={Show_NewsSnippets[0]} News_Date={Show_NewsDates[0]} News_Url={Show_NewsURL[0]} News_Author= {Show_NewsAuthor[0]}/>
      // <hr/>
      // <News_Card News_Headlines={Show_NewsHeadlines[1]} News_Info={Show_NewsSnippets[1]} News_Date={Show_NewsDates[1]} News_Url={Show_NewsURL[1]} News_Author= {Show_NewsAuthor[1]}/>
      // <hr/>
      // <News_Card News_Headlines={Show_NewsHeadlines[2]} News_Info={Show_NewsSnippets[2]} News_Date={Show_NewsDates[2]} News_Url={Show_NewsURL[2]} News_Author= {Show_NewsAuthor[2]}/>
      // <hr/>
      // <News_Card News_Headlines={Show_NewsHeadlines[3]} News_Info={Show_NewsSnippets[3]} News_Date={Show_NewsDates[3]} News_Url={Show_NewsURL[3]} News_Author= {Show_NewsAuthor[3]}/>
      // <hr/>