import './App.css';

import React from "react";
import { useParams } from 'react-router-dom';
import { CardData,CardProps } from "./types";
import { useDeck, useDeckUpdate } from "./DeckContext.tsx";

function Card({card_data}:CardProps) {

    const updateDeck = useDeckUpdate()
    const deck = useDeck()
    const params = useParams()

    function changeCard(card:CardData, add:boolean){
      // Add the card from the map
      add ? deck.set(card.id, card) : deck.delete(card.id)

      // Add the card to the deck in the database
      let newCards = Array.from(deck.values()).map(card => card.scryfall_id)

      const editedDeck = {
        cards: newCards
      }
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDeck),
      }

    fetch(`http://localhost:5001/decks/update/cards/${params.deckID}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .then(() => {updateDeck(new Map(deck))})

      // TODO: Create a new Map from the deck in the database 
      // Update the state with the Map; this ensures the app always matches the database
    }

    return (
      <div className='card'>
        <div className="card-info">
            <p>{card_data.name}</p>
        </div>

        {(deck.get(card_data.id) == undefined) && <button onClick={() => changeCard(card_data, true)}> Add to Deck </button>}
        {(deck.get(card_data.id)) && <button onClick={() => changeCard(card_data, false)}> Remove from Deck </button>}

      </div>
    );
}
  
  export default Card;
  