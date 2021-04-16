import logo from './logo.svg';
import './App.css';
import { Login } from './login.js'; // render the Login component from login.js
import io from 'socket.io-client';
export const socket = io(); // Newly added this to App.js

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;