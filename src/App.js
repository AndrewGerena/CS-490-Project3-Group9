import logo from './logo.svg';
import './App.css';
import { TodoPage } from './components/TodoPage.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>ToDo App</h1>
      <TodoPage />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
