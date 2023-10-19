import './App.css';

import React from "react";
import { CardDataProps } from "./types";
import { useDeck, useDeckUpdate } from "./DeckContext.tsx";

function Card({card_data}:CardDataProps) {

    const updateDeck = useDeckUpdate()
    const deck = useDeck()


    return (
      <div className='card'>
        <div className="card-info">
            <p>{card_data.name}</p>
        </div>

        <button onClick={() => updateDeck([...deck, card_data])}> Add to Deck </button>
      </div>
    );
}
  
  export default Card;
  