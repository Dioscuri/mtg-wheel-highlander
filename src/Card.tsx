import './App.css';

import React from "react";
import { CardData,CardProps } from "./types";
import { useDeck, useDeckUpdate } from "./DeckContext.tsx";

function Card({card_data}:CardProps) {

    const updateDeck = useDeckUpdate()
    const deck = useDeck()

    function addCard(card:CardData){
      updateDeck(new Map(deck.set(card.id, card)))
    }

    function deleteCard(card:CardData){
      deck.delete(card.id)

      updateDeck(new Map(deck))
    }

    return (
      <div className='card'>
        <div className="card-info">
            <p>{card_data.name}</p>
        </div>

        {(deck.get(card_data.id) == undefined) && <button onClick={() => addCard(card_data)}> Add to Deck </button>}
        {(deck.get(card_data.id)) && <button onClick={() => deleteCard(card_data)}> Remove from Deck </button>}

      </div>
    );
}
  
  export default Card;
  