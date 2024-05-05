import './App.css';
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import { useState } from 'react';

function App() {

  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="App">
      <Header setSearchInput={setSearchInput} />
      <Home searchInput={searchInput} setSearchInput={setSearchInput}/>
    </div>
  );
}

export default App;
