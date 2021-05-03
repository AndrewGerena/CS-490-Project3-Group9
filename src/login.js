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
        <div className="middle"><h1> Our Team </h1></div>
        <div className = "About_Wrapper">
          <div className="AboutUsPage_div">
            <div class="flip_card_1">
              <div class="flip_card_inner_1">
                <div class="flip_card_1_front">
                  <img className = "Img_card_1" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619979494/Deep_y8k2f2.png"/> 
                  <h1>Amandeep Singh</h1> 
                </div>
                <div class="flip_card_1_back">
                  <h1 className="Card_Back_Name">Amandeep Singh</h1>
                  <p className="Card_Back_Info">Majoring in Computer Science at NJIT, and an Eboard memeber of ACM. Graduating in Spring 2022, I still don't have any plans after graduation. I like playing video games and going on walks.</p>
                </div>
              </div>
            </div>
            <div class="flip_card_2">
              <div class="flip_card_inner_2">
                <div class="flip_card_2_front">
                  <img className = "Img_card_2" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619808021/SunnyK-Img_sahqpo.jpg"/> 
                  <h1>Sunny Kuntamukkala</h1> 
                </div>
                <div class="flip_card_2_back">
                  <h1 className="Card_Back_Name">Sunny Kuntamukkala</h1>
                  <p className="Card_Back_Info">Currently a senior at NJIT studying Computer Science and a volunteer tutor at ACM. I hope to pursue a career in back-end development. I enjoy playing basketball with my friends during my free time.</p>
                </div>
              </div>
            </div>
            <div class="flip_card_3">
              <div class="flip_card_inner_3">
                <div class="flip_card_3_front">
                  <img className = "Img_card_3" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619979496/Andrew_ssa84d.jpg"/> 
                  <h1>Andrew Gerena</h1> 
                </div>
                <div class="flip_card_3_back">
                  <h1 className="Card_Back_Name">Andrew Gerena</h1>
                  <p className="Card_Back_Info">Currently I am a senior studying Computer Science at NJIT. After graduation, I will pursue a job in the field of Cybersecurity. I love playing frisbee and exploring new places.</p>
                </div>
              </div>
            </div>
            <div class="flip_card_4">
              <div class="flip_card_inner_4">
                <div class="flip_card_4_front">
                  <img className = "Img_card_4" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619979330/IMG_4275_n0bw1j.jpg"/> 
                  <h1>Sunny Raval</h1> 
                </div>
                <div class="flip_card_4_back">
                  <h1 className="Card_Back_Name">Sunny Raval</h1> 
                  <p className="Card_Back_Info">Majoring in Computer Science at NJIT, graduating in December 2021. My main goal is to work as a full-stack web developer. In my free time, I like to explore new web development technologies, play sports, and play video games. </p>
                </div>
              </div>
            </div>
          </div>
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
    <div className = "FullPage_Wrapper">
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
      </div>
      <div className="landing-info">
        <div className="content-divider_1"></div>
        <img className="News_Img" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1618946888/Newsimg_harljy.png"/>
        <img className="Weather_Img" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1618946882/WeatherImg_d05jmk.png"/>
        <img className="Todo_Img" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1618946885/Todolist_su8dg0.png"/>
        <img className="Covid_Img" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619825092/CovidUpdate_o2e0xm.gif"/>
        
        
        <h1 className ="About_Title">What is this about?</h1>
        <div className="Outer_Border_1"></div>
        <div className="About_Wrapper">
          <p className="About_Info">Have you ever thought about having an app where you are able to plan your daily tasks, view your local weather and read the latest news all in once place? MyDay is just that app. With the help of the MyDay app, you are able to achieve all of the above functionalities with great efficiency. You will longer have to navigate through the web to receive your most essential information!</p>
        </div>
        
        <div class="wrap">
            <section class="feature-section">
                <h2>functionalities</h2>
                <div class="feature feature-item">
                    <h3>Todo List</h3>
                    <p>Keep track of your daily todo lists and never miss a deadline!</p>
                </div>
                <div class="feature feature-item">
                    <h3>Weather Information</h3>
                    <p>View your local weather for the next 5 days on our sleek interface!</p>
                </div>
                <div class="feature feature-item">
                    <h3>News Headlines</h3>
                    <p>Read the latest news headlines for topics that interest you at any time!</p>
                </div>
                <div class="feature feature-item">
                    <h3>Covid Stats Tracker</h3>
                    <p>View latest COVID-19 stats for any country. Just search for a country!</p>
                </div>
            </section>
          </div>
          <img className="ToDoFunc_Pic" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619837807/TodoPage_pic_zlcczl.png"/>
          <img className="WeatherFunc_Pic" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619837809/WeatherPage_pic_g65er1.png"/>
          <img className="NewsFunc_Pic" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619837804/NewsPage_pic_nmkwmr.png"/>
          <img className="ToDoArrow_Pic" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619840620/Ar-removebg-preview_splacx.png"/> 
          <h2 className ="ToDoPic_Name">TODO SECTION</h2>
          <img className="WeatherArrow_Pic" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619840620/Ar-removebg-preview_splacx.png"/>
          <h2 className ="WeatherPic_Name">WEATHER SECTION</h2>
          <img className="NewsArrow_Pic" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619840620/Ar-removebg-preview_splacx.png"/>
          <h2 className ="NewsPic_Name">NEWS SECTION</h2>
          <img className="CovidArrow_Pic" src = "https://res.cloudinary.com/ddsomtotk/image/upload/v1619840620/Ar-removebg-preview_splacx.png"/>
          <h2 className ="CovidPic_Name">COVID SECTION</h2>
      
      </div>
      <div className="footer">
      	<div className="footer-top"></div>
      	<div className="footer-center"><p className="footer_p">&copy; SASA Inc. All Rights Reserved.</p></div>
      	<div className="footer-bottom"></div>
      </div>
    </div>
  );
}

export default Login;
