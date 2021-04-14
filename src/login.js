import React from 'react';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import { GoogleLogin } from 'react-google-login'; 
import os from 'os';

const CLIENT_ID = os.getenv('CLIENT_ID')
const CLIENT_SECRET = os.getenv('CLIENT_SECRET') 

export function Login(props) {
    
}

export default Login;