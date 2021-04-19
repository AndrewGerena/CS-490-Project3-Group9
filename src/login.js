/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { DashBoard } from './dashboard';
// import { refreshTokenSetup } from '../utils/refreshToken';
import { socket } from './App';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export function Login(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // will retrieve basic profile info from user if they are new
  const [isNewUser, setIsNewUser] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // eslint-disable-next-line no-undef
    alert(
      `Login Successful. Welcome ${res.profileObj.name}.`,
    );
    //  const { IDToken } = res.getAuthResponse(); // this works
    const profile = res.getBasicProfile();

    const id = profile.getId();
    const fullName = profile.getName();
    const givenName = profile.getGivenName();
    const familyName = profile.getFamilyName();
    const imageURL = profile.getImageUrl();
    const email = profile.getEmail();
    setIsLoggedIn(true);
    setUserEmail(email);

    socket.emit('login', {
      id,
      email,
      fullName,
      givenName,
      familyName,
      imageURL,
    });
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // eslint-disable-next-line no-undef
    alert(
      'Login Unsuccessful. Please try again.',
    );
  };

  // working on useEffect here

  useEffect(() => {
    socket.on('login', (data) => {
      console.log('Login event received!');
      console.log(data);
      if (data.user_exists) {
        setIsNewUser(true);
        // will do conditional rendering for new users
        // where they go to basic profile info page first
      }
    });
  }, []);

  function Home() {
    return <></>;
  }
  function About() {
    return <h2>You are in about us</h2>;
  }
  function Contact() {
    return <h2>You are in contact</h2>;
  }
  if (isHome) {
    return (
      <div>
        <DashBoard />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div>
        <DashBoard email={userEmail} />
      </div>
    );
  }

  return (
    <div>
      <Router>
        <div className="header">
          <center>
            <ul className="menu">
              <li><Link to="/"><p>Home</p></Link></li>
              <li><Link to="/about"><p>About Us</p></Link></li>
              <li><Link to="/contact"><p>Contact</p></Link></li>
            </ul>
          </center>
          <Switch>
            <Route path="/"><Home /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/contact"><Contact /></Route>
          </Switch>
        </div>
      </Router>
      <div className="middle">
        <center>
          <h1>MyDay Planner</h1>
          <h2>Use this app to plan out your day!</h2>
          <br />
          <br />
          <br />
          <br />
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
            style={{ marginTop: '100px' }}
            isSignedIn={false}
          />
        </center>
      </div>
      <div className="footer">
        <center><p>&copy; SASA Inc. All Rights Reserved.</p></center>
      </div>
    </div>
  );
}

export default Login;
