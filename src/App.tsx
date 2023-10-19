import './App.css';
import Search from './Search.tsx';
import React from 'react';
import { DeckProvider } from './DeckContext.tsx';

function App() {
  return (
    <div className="App">
      <DeckProvider >
        <Search/>
      </DeckProvider>
    </div>
  );
}

export default App;
