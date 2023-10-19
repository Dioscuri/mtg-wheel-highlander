import './App.css';
import Search from './Search.tsx';
import React from 'react';
import { DeckProvider } from './DeckContext.tsx';
import Deck from './Deck.tsx';

function App() {
  return (
    <div className="App">
      <DeckProvider >
        <Deck/>
        <Search/>
      </DeckProvider>
    </div>
  );
}

export default App;
