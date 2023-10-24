import React from 'react';
import './App.css';
import Search from './Search.tsx';
import { Navigation } from './Navigation.tsx';

function App() {
   function  test(){
    fetch(`http://localhost:5001/decks`)
      .then((response) =>response.json()) 
      .then((data) => console.log(data))
  }

  return (
      <div>
          <Navigation></Navigation>
          <p> this is from the App component</p>
          <button onClick={test}> Database Connection Test</button>
      </div>
  );
}

export default App;
