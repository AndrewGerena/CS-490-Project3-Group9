import React from "react";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { News_Card } from "./News_Cards.js";
import { Covid_Card } from "./Covid_Cards.js";

const socket = io();

export function News() { 
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
  const [NewsSearch, setNewsSearch] = useState(false);
  const [OnloadData, setOnloadData] = useState(true);
  
  
  //For Covid Section
  const [DisplayCovidDate, setDisplayCovidDate] = useState([]);
  const [DisplayCovidTotalCases, setDisplayCovidTotalCases] = useState([]);
  const [DisplayCovidNewCases, setDisplayCovidNewCases] = useState([]);
  const [DisplayCovidTotalDeaths, setDisplayCovidTotalDeaths] = useState([]);
  const [DisplayCovidNewDeaths, setDisplayCovidNewDeaths] = useState([]);
  const [DisplayCovidTotalRecovered, setDisplayCovidTotalRecovered] = useState([]);
  const [DisplayCovidNewRecovered, setDisplayCovidNewRecovered] = useState([]);
  const [Country_Input, setCountry_Input] = useState("Global");
  const [CovidSearch, setCovidSearch] = useState(false);
  
  if(OnloadData){
    socket.emit('Onload_News_Headlines');
    socket.emit('Onload_Covid_Global');
    setOnloadData(false);
  }
  
  
  function User_News_Topic_Search() {
    if (News_Topic_User_Input != null) {
      let Curr_News_Search = News_Topic_User_Input.current.value;
      setNews_Topic(Curr_News_Search);
      setNewsSearch(true);
      console.log("The User Searched NEWs Topic: " + Curr_News_Search);
      socket.emit('User_Searched_News_Topic', {News_Topic_Searched: Curr_News_Search});
      
    }
  }
  
  function User_Covid_Country_Search(){
    if (Covid__Country_User_Input != null) {
      let Curr_Country_Search = Covid__Country_User_Input.current.value;
      setCountry_Input(Curr_Country_Search);
      setCovidSearch(true);
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
      Show_NewsHeadlines.push(DisplayNewsHeadlines[i]);
      console.log(DisplayNewsSnippet[i]);
      Show_NewsSnippets.push(DisplayNewsSnippet[i]);
      console.log(DisplayNewsDate[i]);
      Show_NewsDates.push(DisplayNewsDate[i]);
      console.log(DisplayNewsURL[i]);
      Show_NewsURL.push(DisplayNewsURL[i]);
      console.log(DisplayNewsAuthor[i]);
      Show_NewsAuthor.push(DisplayNewsAuthor[i]);
  }
      

  return (
    <div className="News_div">
      <h1 className="News_Sec_Name">News Section!</h1>
      <input className="Form_Input" type="text" ref={News_Topic_User_Input} />
      <button className="Form_Btn" type="Submit" onClick={User_News_Topic_Search}>Submit</button>
      <div className="News_Conditional_Wrapper">
        {NewsSearch ?(
          <div className="Searched_News_Div">
            <h4 className="Searched_Topic">Current News Topic: {News_Topic} </h4>
            <News_Card News_Headlines={Show_NewsHeadlines} News_Info={Show_NewsSnippets} News_Date={Show_NewsDates} News_Url={Show_NewsURL} News_Author= {Show_NewsAuthor}/>
          </div>
        ):
          <div className="Searched_News_Div">
            <h4 className="Searched_Topic">Current News Topic: {News_Topic} </h4>
            <News_Card News_Headlines={Show_NewsHeadlines} News_Info={Show_NewsSnippets} News_Date={Show_NewsDates} News_Url={Show_NewsURL} News_Author= {Show_NewsAuthor}/>
          </div>
        }
      </div>
      <div className="Covid_div">
        <input className="Form_Input_Covid" type="text" ref={Covid__Country_User_Input} />
        <button className="Form_Btn_Covid" type="Submit" onClick={User_Covid_Country_Search}>Submit</button>
        <div className="Covid_Conditional_Wrapper">
          {CovidSearch ?(
            <div>
              <h2>Covid Statistics:</h2>
              <h4>{Country_Input}</h4>
              <div className="Covid_Search_Content">
                <Covid_Card Covid_Date={DisplayCovidDate} Covid_TotalCases={DisplayCovidTotalCases} Covid_NewCases={DisplayCovidNewCases} Covid_TotalDeaths={DisplayCovidTotalDeaths} Covid_NewDeaths= {DisplayCovidNewDeaths}  Covid_TotalRecovered={DisplayCovidTotalRecovered} Covid_NewRecovered={DisplayCovidNewRecovered}/>
              </div>
            </div>
          ):
            <div>
              <h2>Covid Statistics:</h2>
              <h4>{Country_Input}</h4>
              <div className="Covid_Default_Content">
                <Covid_Card Covid_Date={DisplayCovidDate} Covid_TotalCases={DisplayCovidTotalCases} Covid_NewCases={DisplayCovidNewCases} Covid_TotalDeaths={DisplayCovidTotalDeaths} Covid_NewDeaths= {DisplayCovidNewDeaths}  Covid_TotalRecovered={DisplayCovidTotalRecovered} Covid_NewRecovered={DisplayCovidNewRecovered}/>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );

}

export default News;
