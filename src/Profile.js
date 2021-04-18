import React, { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import './App.css';

export function Profile(props) {
  const [zip,setZip] = useState(""); 
  const inputRef = useRef();

  function zipButton(){
    // will add test for alphanumeric character later
    const zipcode = inputRef.current.value;
    console.log(zipcode); 
    console.log(props.email);
    if (zipcode.length === 5) {
      socket.emit('new_zip', {
        zip: zipcode,
        email: props.email,
      });
    }
    else {
      alert("Bad zipcode"); 
    }
  }

  useEffect(() => {
    socket.on('new_zip', (data) => {
      console.log('new_zip event received!');
      console.log(data.zip);
      setZip(data.zip); 
    })
  }, []);

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