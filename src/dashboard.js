import './App.css';
import React, { useState, useEffect, useRef } from 'react';
// import {
//  BrowserRouter as Router, Switch, Route, Link,
// } from 'react-router-dom';
import { socket } from './App';
import { Sample } from './sample';
import { News } from './News';
import { TodoPage } from './ToDoComponents/TodoPage';
import { Profile } from './Profile';

export function DashBoard(props) {
  const [weather, setWeather] = useState(false);
  const [news, setNews] = useState(false);
  const [todo, setTodo] = useState(false);
  const [profile, setProfile] = useState(false);
  const [forecast, setForecast] = useState([[], [], [], [], [], []]);

  const emailRef = useRef(null);
  emailRef.current = props.email;
  
  const firstName = props.name;
  console.log(props.name); 

  function onClickProfile() {
    setProfile(true);
    setWeather(false);
    setNews(false);
    setTodo(false);
  }

  function onClickWeather() {
    setWeather(true);
    setNews(false);
    setTodo(false);
    setProfile(false);
    socket.emit('forecast', { email: props.email });
    console.log(forecast);
  }
  function onClickNews() {
    setNews(true);
    setWeather(false);
    setTodo(false);
    setProfile(false);
  }
  function onClickTodo() {
    setTodo(true);
    setWeather(false);
    setNews(false);
    setProfile(false);
  }
  let test = ' ';
  if (profile) {
    test = <center><Profile email={props.email} /></center>;
  } else if (weather) {
    test = <center><Sample forecast={forecast} /></center>;
  } else if (news) {
    test = <center><News /></center>;
  } else if (todo) {
    test = <center><TodoPage /></center>;
  }

  useEffect(() => {
    // When a move has been made.
    socket.on('forecast', (data) => {
    if (data.email == emailRef.current){
      setForecast(data.weather);
      console.log(data.weather);
    }

    });
  }, []);
    
    return (
         <div>
          	<div className="header NewsPage_Header">
  	            <div className="header-top"></div>
  	            <div className="NavBar">
  	                <a className="Company_Logo"><img src='https://res.cloudinary.com/ddsomtotk/image/upload/v1618887646/57dd63e9c36d40e8aa369502ee886d0e_lmpcru.png' alt="Comp_logo"/></a>
                </div>
                <div className="header-bottom"></div>
                    <center>
                        <div className="dash_card">
                            <ul className = "dash_btn">
                                <img  className="profile_img" src ="https://res.cloudinary.com/ddsomtotk/image/upload/v1618947076/Prof_img_kxovem.png" />
                                <button data-testid="profile-btn" onClick={onClickProfile} className="prof-btn btn">Personal Profile</button>
                                <img  className="weather_img" src ="https://res.cloudinary.com/ddsomtotk/image/upload/v1618946882/WeatherImg_d05jmk.png" />
                                <button data-testid="weather-btn" onClick={onClickWeather} className="weath-btn btn">Local Weather</button>
                                <img  className="news_img" src ="https://res.cloudinary.com/ddsomtotk/image/upload/v1618946888/Newsimg_harljy.png" />
                                <button data-testid="news-btn" onClick={onClickNews} className=" news-btn btn">News Updates</button>
                                <img  className="todo_img" src ="https://res.cloudinary.com/ddsomtotk/image/upload/v1618946885/Todolist_su8dg0.png" />
                                <button data-testid="todo-btn" onClick={onClickTodo} className=" todo-btn btn">Daily Tasks</button>
                            </ul>
                        </div>
                    </center>
            </div>
            <div>
              <h2>Hello name</h2>
            </div>
            <div className="Comp_Render">
                {test}
            </div>
            <div className="footer NewsPage_Footer">
      	        <div className="footer-top"></div>
      	        <div className="footer-center NewsPage_FooterText"><p>&copy; SASA Inc. All Rights Reserved.</p></div>
      	        <div className="footer-bottom"></div>
            </div>
        </div>
        
    );
}

export default DashBoard;
