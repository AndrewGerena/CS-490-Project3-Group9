import React, { useState, useRef, useEffect } from 'react';

import io from 'socket.io-client';
import { NewsCard } from './NewsCard';
import { CovidCard } from './CovidCard';

const socket = io();

export function News() {
  // Reading Inputs

  const NewsTopicUserInput = useRef(null);
  const CovidCountryUserInput = useRef(null);

  // For NEWs Section
  const [DisplayNewsHeadlines, setDisplayNewsHeadlines] = useState([]);
  const [DisplayNewsSnippet, setDisplayNewsSnippet] = useState([]);
  const [DisplayNewsDate, setDisplayNewsDate] = useState([]);
  const [DisplayNewsURL, setDisplayNewsURL] = useState([]);
  const [DisplayNewsAuthor, setDisplayNewsAuthor] = useState([]);
  const [NewsTopic, setNewsTopic] = useState('Global');

  // For Covid Section
  const [DisplayCovidDate, setDisplayCovidDate] = useState([]);
  const [DisplayCovidTotalCases, setDisplayCovidTotalCases] = useState([]);
  const [DisplayCovidNewCases, setDisplayCovidNewCases] = useState([]);
  const [DisplayCovidTotalDeaths, setDisplayCovidTotalDeaths] = useState([]);
  const [DisplayCovidNewDeaths, setDisplayCovidNewDeaths] = useState([]);
  const [DisplayCovidTotalRecovered, setDisplayCovidTotalRecovered] = useState([]);
  const [DisplayCovidNewRecovered, setDisplayCovidNewRecovered] = useState([]);
  const [CountryInput, setCountryInput] = useState('Global');

  window.onload = function () { // eslint-disable-line
    socket.emit('Onload_News_Headlines');
    socket.emit('Onload_Covid_Global');
  };

  function UserNewsTopicSearch() {
    if (NewsTopicUserInput != null) {
      const CurrNewsSearch = NewsTopicUserInput.current.value;
      setNewsTopic(CurrNewsSearch);
      console.log(`The User Searched NEWs Topic: ${CurrNewsSearch}`);
      socket.emit('User_Searched_News_Topic', { News_Topic_Searched: CurrNewsSearch });
    }
  }

  function UserCovidCountrySearch() {
    if (CovidCountryUserInput != null) {
      const CurrCountrySearch = CovidCountryUserInput.current.value;
      setCountryInput(CurrCountrySearch);
      console.log(`The User Searched Covid Country: ${CurrCountrySearch}`);
      socket.emit('User_Searched_Covid_Country', { Covid_Country_Searched: CurrCountrySearch });
    }
  }

  useEffect(() => {
    // --------------Answering User Asked News topic------------------------------
    socket.on('Answer_Searched_News_Topic', (FetchedNewsData) => {
      console.log(`These are the article Headlines: ${FetchedNewsData.Headlines}`);
      setDisplayNewsHeadlines(FetchedNewsData.Headlines);

      console.log(`These are the article Snippets: ${FetchedNewsData.Snippets}`);
      setDisplayNewsSnippet(FetchedNewsData.Snippets);

      console.log(`These are the article Dates: ${FetchedNewsData.Date}`);
      setDisplayNewsDate(FetchedNewsData.Date);

      console.log(`These are the article URLS: ${FetchedNewsData.URL}`);
      setDisplayNewsURL(FetchedNewsData.URL);

      console.log(`These are the article Authors: ${FetchedNewsData.Author}`);
      setDisplayNewsAuthor(FetchedNewsData.Author);
    });

    // ------------- Answering User Asked Covid Data-----------------------
    socket.on('Answer_Searched_Covid_Country', (FetchedCountryData) => {
      console.log(`Latest Covid Stats Date: ${FetchedCountryData.Date}`);
      setDisplayCovidDate(FetchedCountryData.Date);

      console.log(`Total Covid Cases: ${FetchedCountryData.TotalCases}`);
      setDisplayCovidTotalCases(FetchedCountryData.TotalCases);

      console.log(`New Covid Cases: ${FetchedCountryData.NewCases}`);
      setDisplayCovidNewCases(FetchedCountryData.NewCases);

      console.log(`Total Covid Deaths: ${FetchedCountryData.TotalDeaths}`);
      setDisplayCovidTotalDeaths(FetchedCountryData.TotalDeaths);

      console.log(`New Covid Deaths: ${FetchedCountryData.NewDeaths}`);
      setDisplayCovidNewDeaths(FetchedCountryData.NewDeaths);

      console.log(`Total Covid Recoveries: ${FetchedCountryData.TotalRecovered}`);
      setDisplayCovidTotalRecovered(FetchedCountryData.TotalRecovered);

      console.log(`New Covid Recoveries: ${FetchedCountryData.NewRecovered}`);
      setDisplayCovidNewRecovered(FetchedCountryData.NewRecovered);
    });
  }, []);

  const ShowNewsHeadlines = [];
  const ShowNewsSnippets = [];
  const ShowNewsDates = [];
  const ShowNewsURL = [];
  const ShowNewsAuthor = [];

  for (let i = 0; i < DisplayNewsHeadlines.length; i + 1) {
    console.log(DisplayNewsHeadlines[i]);
    ShowNewsHeadlines.push(DisplayNewsHeadlines[i]);
    console.log(DisplayNewsSnippet[i]);
    ShowNewsSnippets.push(DisplayNewsSnippet[i]);
    console.log(DisplayNewsDate[i]);
    ShowNewsDates.push(DisplayNewsDate[i]);
    console.log(DisplayNewsURL[i]);
    ShowNewsURL.push(DisplayNewsURL[i]);
    console.log(DisplayNewsAuthor[i]);
    ShowNewsAuthor.push(DisplayNewsAuthor[i]);
  }

  return (
    <div className="App">
      <h1>News Section!</h1>
      <input id="Form_Input" type="text" ref={NewsTopicUserInput} />
      <button id="Form_Btn" type="submit" onClick={UserNewsTopicSearch}>Submit</button>
      <h1>
        THE NEWS TOPIC:
        {NewsTopic}
      </h1>
      <NewsCard
        NewsHeadlines={ShowNewsHeadlines}
        NewsInfo={ShowNewsSnippets}
        NewsDate={ShowNewsDates}
        NewsURL={ShowNewsURL}
        NewsAuthor={ShowNewsAuthor}
      />
      <hr />
      <input id="Form_Input_Covid" type="text" ref={CovidCountryUserInput} />
      <button id="Form_Btn_Covid" type="submit" onClick={UserCovidCountrySearch}>Submit</button>
      <h1>
        Covid Stats For:
        {CountryInput}
      </h1>
      <CovidCard
        CovidDate={DisplayCovidDate}
        CovidTotalCases={DisplayCovidTotalCases}
        CovidNewCases={DisplayCovidNewCases}
        CovidTotalDeaths={DisplayCovidTotalDeaths}
        CovidNewDeaths={DisplayCovidNewDeaths}
        CovidTotalRecovered={DisplayCovidTotalRecovered}
        CovidNewRecovered={DisplayCovidNewRecovered}
      />
    </div>

  );
}

export default News;
