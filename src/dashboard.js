import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Sample } from './sample.js';
import {News} from './News.js';
import { TodoPage } from './ToDoComponents/TodoPage.js';
import Profile from './Profile';

export function DashBoard(props) {
    const [weather, setWeather] = useState(false);
    const [news, setNews] = useState(false);
    const [todo, setTodo] = useState(false);
    const [profile, setProfile] = useState(false);
    const [forecast, setForecast] = useState([[],[],[],[],[],[]]);
    
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
        socket.emit('forecast', {email: props.email});
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
    var test = " "; 
    if (profile) {
        test = <center><Profile email={props.email} /></center>;
    }
    else if (weather) {
        test = <center><Sample forecast={forecast}/></center>; 
    }
    else if (news) {
        test = <center><News /></center>
    }
    else if (todo) {
        test = <center><TodoPage /></center>;
        //<center><h2>You are on your to-do list now</h2></center>
    }
    
    useEffect(() => {
    // When a move has been made.
    socket.on('forecast', (data) => {
        setForecast(data);
        console.log(data);
    });
  }, []);
    
    return (
        <div>
            <center>
                <h1>Welcome to the MyDay App</h1>
                <button data-testid="profile-btn" onClick={onClickProfile} className="btn">Personal Profile</button>
                <button data-testid="weather-btn" onClick={onClickWeather} className="btn">Local Weather</button>
                <button data-testid="news-btn" onClick={onClickNews} className="btn">News Updates</button>
                <button data-testid="todo-btn" onClick={onClickTodo} className="btn">Daily Tasks</button>
            </center>
            <br></br><br></br>
            {test}
        </div>
    );
}

export default DashBoard;