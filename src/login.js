import React from 'react';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import { GoogleLogin } from 'react-google-login'; 
import os from 'os';
import { DashBoard } from './dashboard.js';
//import { refreshTokenSetup } from '../utils/refreshToken';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export function Login(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false); // will retrieve basic profile info from user if they are new
  const [isHome, setIsHome] = useState(false); 
  const [userEmail, setUserEmail] = useState(""); 
  
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Login Successful. Welcome ${res.profileObj.name}.`
    );
    var id_token = res.getAuthResponse().id_token; // this works
    var profile = res.getBasicProfile();
    
    var id = profile.getId(); 
    var full_name = profile.getName();
    var given_name = profile.getGivenName();
    var family_name = profile.getFamilyName();
    var image_url = profile.getImageUrl();
    var email = profile.getEmail(); 
    setIsLoggedIn(true);
    setUserEmail(email); 
    
    socket.emit('login', {
      id: id,
      email: email,
      full_name: full_name,
      given_name: given_name,
      family_name: family_name,
      image_url: image_url,
    });
  
    //console.log("ID TOKEN BELOW");
    //console.log(id_token);
    //testing for Heroku deployment
    console.log("PROFILE BELOW");
    console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    //refreshTokenSetup(res); // makes sure token doesn't expire after 1 hr
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Login Unsuccessful. Please try again.`
    );
  };
  
  // working on useEffect here
  
  useEffect(() => {
    socket.on('login', (data) => {
      console.log('Login event received!');
      console.log(data);
      if (data.user_exists) {
        setIsNewUser(true); // will do conditional rendering for new users where they go to basic profile info page first
      }
    });
  }, []);
  
  function Home() {
    return <h2></h2>
  }
  function About() {
    return <h2>You are in about us</h2>
  }
  function Contact() {
    return <h2>You are in contact</h2>
  }
  if (isHome) {
    return (
      <div>
        <DashBoard /> 
      </div>
    )
  }
  
  if (isLoggedIn) {
    return (
      <div className="parent_div">
        <DashBoard email={userEmail} />
      </div>
    )
  }
  
  return (
    <div>
      <Router>
  	    <div className="header">
  	      <div className="header-top"></div>
          <center>
            <div className="NavBar">
              <a className="Company_Logo"><img src='https://res.cloudinary.com/ddsomtotk/image/upload/v1618887646/57dd63e9c36d40e8aa369502ee886d0e_lmpcru.png' alt="Comp_logo"/></a>
              <div className="Nav_Links">
            	  <a href="#home" className="active">Home</a>
            	  <a href="#about">About Us</a>
            	  <a href="#contact">Contact</a>
              </div>
            </div>
          </center>
          <Switch>
            <Route path="/"><Home /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/contact"><Contact /></Route>
          </Switch>
          <div className="header-bottom"></div>
        </div>
      </Router>
      <div className="middle">
        <center>
          <h1>MyDay Planner</h1>
          <h2>Use this app to plan out your day!</h2>
          <br></br><br></br><br></br><br></br>
          <div className="Main-Content">
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              style={{ marginTop: '100px' }}
              isSignedIn={false}
            />
          </div>
        </center>
      </div>
      <div className="footer">
      	<div className="footer-top"></div>
      	<div className="footer-center"><p>&copy; SASA Inc. All Rights Reserved.</p></div>
      	<div className="footer-bottom"></div>
      </div>
    </div>
  );
}

export default Login;

