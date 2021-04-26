import React from 'react';
import './App.css';
import io from 'socket.io-client';
import { Login } from './login';
// render the Login component from login.js
export const socket = io(); // Newly added this to App.js

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
