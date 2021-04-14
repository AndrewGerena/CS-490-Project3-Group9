import React from 'react';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import { GoogleLogin } from 'react-google-login'; 
import os from 'os';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export function Login(props) {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Login Successful. Welcome ${res.profileObj.name}.`
    );
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <center>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={false}
          />
          </center>
    </div>
  );
}