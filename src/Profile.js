import React, { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import './App.css';

function Profile() {
  const inputRef = useRef();

  function zipButton(){
    if (inputRef.current.value !== '') {
        var zipcode = inputRef.current.value;
        alert(zipcode);
    }
  }

  return (
    <div>
        <h1>Welcome to the Profile Page!</h1>
        <div>
        <h3>Set your zipcode here</h3>
        <input ref={inputRef} type="text" aria-label="zipcode-input" />
            <button onClick={zipButton} type="submit">
                Confirm
            </button>
        </div>
    </div>
  );
}


export { Profile as default };