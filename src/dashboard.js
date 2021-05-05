/* eslint-disable prefer-const, no-unused-vars, jsx-a11y/anchor-is-valid */
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { socket } from './App';
import { Sample } from './sample';
import { News } from './News';
import { TodoPage } from './ToDoComponents/TodoPage';
import { Profile } from './Profile';
import findDate from './date';

export function DashBoard({ email, name, picURL }) {
  const [weather, setWeather] = useState(false);
  const [news, setNews] = useState(false);
  const [todo, setTodo] = useState(false);
  const [profile, setProfile] = useState(false);
  const [forecast, setForecast] = useState([[], [], [], [], [], []]);
  const [date, setDate] = useState(new Date()); // Holds the date!
  const emailRef = useRef(null);
  emailRef.current = email;
  const firstName = name;
  const profilePic = picURL;
  console.log(name);

  let month;
  let day;
  let year;
  let hour;
  let min;
  let sec;

  function clock() {
    setDate(new Date());
  }
  setInterval(clock, 1000);

  month = date.getMonth() + 1;
  day = date.getDate();
  year = date.getFullYear();
  hour = date.getHours();
  min = date.getMinutes();
  sec = date.getSeconds();

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
    socket.emit('forecast', { email: email }); // eslint-disable-line object-shorthand
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
    test = <center><Profile email={email} /></center>;
  } else if (weather) {
    test = <center><Sample forecast={forecast} email={email} /></center>;
  } else if (news) {
    test = <center><News email={email} /></center>;
  } else if (todo) {
    test = <center><TodoPage email={email} /></center>;
  }

  useEffect(() => {
    // When a move has been made.
    socket.on('forecast', (data) => {
      if (data.email === emailRef.current) {
        setForecast(data.weather);
        console.log(data.weather);
      }
    });
  }, []);
  let message = '';
  if (!weather && !news && !todo && !profile) {
    message = (
      <div className="welcome-msg">
        <div className="Main_Welcome_Div">
          <div className="Home_Wrapper">
            <h1 className="DashHome_h1">
              Hello
              {firstName}
              !
            </h1>
            <img alt="" className="Fire_TL" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1612802629/FireBurn-Pic-uvz5ud-unscreen_fvktbd.gif" />
            <img alt="" className="Fire_TR" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1612802629/FireBurn-Pic-uvz5ud-unscreen_fvktbd.gif" />
            <img alt="" className="Fire_RB" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1612802629/FireBurn-Pic-uvz5ud-unscreen_fvktbd.gif" />
            <img alt="" className="Fire_LB" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1612802629/FireBurn-Pic-uvz5ud-unscreen_fvktbd.gif" />
          </div>
          <div className="Image_Wrapper glow">
            <img alt="" src={profilePic} />
          </div>
        </div>
        <div className="Time_Div">
          <h3 className="DashHome_h3">
            Thursday,
            {month}
            /
            {day}
            /
            {year}
          </h3>
          <div className="Hours">
            <p>Hours</p>
            <h1>{hour}</h1>
          </div>
          <p className="Colon_1">:</p>
          <div className="Mins">
            <p>Mins</p>
            <h1>{min}</h1>
          </div>
          <p className="Colon_2">:</p>
          <div className="Secs">
            <p>Secs</p>
            <h1>{sec}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header NewsPage_Header">
        <div className="header-top" />
        <div className="NavBar">
          <a className="Company_Logo"><img src="https://res.cloudinary.com/ddsomtotk/image/upload/v1618887646/57dd63e9c36d40e8aa369502ee886d0e_lmpcru.png" alt="Comp_logo" /></a>
        </div>
        <div className="header-bottom" />
        <center>
          <div className="dash_card">
            <ul className="dash_btn">
              <img alt="" className="profile_img" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1618947076/Prof_img_kxovem.png" />
              <button type="button" data-testid="profile-btn" onClick={onClickProfile} className="prof-btn btn">Personal Profile</button>
              <img alt="" className="weather_img" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1618946882/WeatherImg_d05jmk.png" />
              <button type="button" data-testid="weather-btn" onClick={onClickWeather} className="weath-btn btn">Local Weather</button>
              <img alt="" className="news_img" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1618946888/Newsimg_harljy.png" />
              <button type="button" data-testid="news-btn" onClick={onClickNews} className="news-btn btn">News Updates</button>
              <img alt="" className="todo_img" src="https://res.cloudinary.com/ddsomtotk/image/upload/v1618946885/Todolist_su8dg0.png" />
              <button type="button" data-testid="todo-btn" onClick={onClickTodo} className="todo-btn btn">Daily Tasks</button>
            </ul>
          </div>
        </center>
      </div>
      {message}
      <div className="Comp_Render">
        {test}
      </div>
      <div className="footer NewsPage_Footer">
        <div className="footer-top" />
        <div className="footer-center NewsPage_FooterText"><p>&copy; SASA Inc. All Rights Reserved.</p></div>
        <div className="footer-bottom" />
      </div>
    </div>
  );
}

export default DashBoard;
