import React from "react";
import { CardData } from "./types";
import { useDeck } from "./DeckContext.tsx";
import Card from "./Card.tsx";

function Deck() {
    const deck = useDeck()

    return (
      <div className="deck">
        <h3 style={{marginTop: 0, color:"var(--accent-theme-color)"}}> Card List </h3>
        {deck.size > 0 && 
          // Convert the map to an array to create the list of elements
          Array.from(deck.values()).map((card:CardData)=>{
              return <Card card_data={card}/>
          })
        }
        {
          deck.size == 0 && <p style={{color:"grey", fontStyle:"italic"}}> Empty </p>
        }
      </div>
    );
  }
  
  export default Deck;