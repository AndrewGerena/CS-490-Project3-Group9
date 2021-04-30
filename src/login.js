/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { DashBoard } from './dashboard';
import { Logout } from './logout'; 
// import { refreshTokenSetup } from '../utils/refreshToken';
import { socket } from './App';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export function Login(props) {
  const [aboutUs, setAboutUs] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // will retrieve basic profile info from user if they are new
  const [isNewUser, setIsNewUser] = useState(false);
  //const [isHome, setIsHome] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [url, setUrl] = useState('');
  
  function onClickHome() {
    setAboutUs(false); 
  }
  
  function onClickAbout() {
    setAboutUs(true);
  }
  
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
    setFirstName(givenName); 
    setUrl(imageURL);

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
  
  function onClickLogout() {
    setIsLoggedIn(false);
    setIsNewUser(false);
    //setIsHome(false); // may not need this one
    setUserEmail(''); 
    setFirstName('');
    setUrl('');
    // we don't need to use useEffect here b/c we aren't transmitting this data to other clients
  }

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
  
  // once user is logged in, we show dashboard and logout features to them
  if (isLoggedIn) {
    return (
      <div className="parent_div">
        <DashBoard email={userEmail} name={firstName} picURL={url}  />
        <div className="logout_btn" onClick={onClickLogout}>
          <Logout /> 
        </div>
      </div>
    );
  }
  
  if (aboutUs) {
    return (
      <div>
    	  <div className="header">
    	    <div className="header-top"></div>
          <center>
            <div className="NavBar">
              <a className="Company_Logo"><img src='https://res.cloudinary.com/ddsomtotk/image/upload/v1618887646/57dd63e9c36d40e8aa369502ee886d0e_lmpcru.png' alt="Comp_logo"/></a>
              <div className="Nav_Links">
                <a className="home" onClick={onClickHome}>Home</a>
              	<a className="active" onClick={onClickAbout}>About Us</a>
              </div>
            </div>
          </center>
          <div className="header-bottom"></div>
        </div>
        <div className="middle">
          <center>
            <h1> Our Team </h1>
            <table>
              <tbody>
                <tr>
                  <td><img src="https://i.imgflip.com/4/d0tb7.jpg" /></td>
                  <td>Amandeep Singh<br></br>Add a description here of yourself eventually</td>
                  <td><img src="https://i.imgflip.com/4/d0tb7.jpg" /></td>
                  <td>Andrew Gerena<br></br>Add a description here of yourself eventually</td>
                </tr>
                <tr>
                  <td><img src="https://i.imgflip.com/4/d0tb7.jpg" /></td>
                  <td>Sunny Kuntamukkala<br></br>Add a description here of yourself eventually</td>
                  <td><img src="https://i.imgflip.com/4/d0tb7.jpg" /></td>
                  <td>Sunny Raval<br></br>Add a description here of yourself eventually</td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
        <div className="footer">
        	<div className="footer-top"></div>
        	<div className="footer-center"><p>&copy; SASA Inc. All Rights Reserved.</p></div>
        	<div className="footer-bottom"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
  	  <div className="header">
  	    <div className="header-top"></div>
        <center>
          <div className="NavBar">
            <a className="Company_Logo"><img src='https://res.cloudinary.com/ddsomtotk/image/upload/v1618887646/57dd63e9c36d40e8aa369502ee886d0e_lmpcru.png' alt="Comp_logo"/></a>
            <div className="Nav_Links">
              <a className="active" onClick={onClickHome}>Home</a>
            	<a className="about" onClick={onClickAbout}>About Us</a>
            </div>
          </div>
        </center>
        <div className="header-bottom"></div>
      </div>

      
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
      <div className="landing-info">
        <center>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <p>What is this about?</p>
          <p>Have you ever thought about having an app where you are able to plan your daily tasks, view your local weather and read the latest news all in once place? MyDay is just that app.</p>
          <br></br><br></br><br></br><br></br>
          <p>With the help of the MyDay app, you are able to achieve all of the above functionalities with great efficiency. You will longer have to navigate through the web to receive your most essential information!</p>
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <img src="https://www.bbc.co.uk/staticarchive/9786fdfd969641533187d5e59e836f584fa7745e.jpg"/>
          <p>Keep track of your daily todo lists and never miss a deadline!</p>
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <img src="https://www.bbc.co.uk/staticarchive/9786fdfd969641533187d5e59e836f584fa7745e.jpg"/>
          <p>View your local weather for the next 5 days on our sleek interface!</p>
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <img src="https://www.bbc.co.uk/staticarchive/9786fdfd969641533187d5e59e836f584fa7745e.jpg"/>
          <p>Read the latest news headlines for topics that interest you at any time!</p>
          <br></br><br></br><br></br><br></br>
          <p>NEW FEATURE</p>
          <p>You may now track the latest COVID-19 data specific to your country with our easy to use tracker. Just search for your country and receive data in seconds!</p>
        </center>
      </div>
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