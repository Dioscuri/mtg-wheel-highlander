import React from "react";
import { CardData } from "./types";
import { useDeck } from "./DeckContext.tsx";
import Card from "./Card.tsx";

function Deck() {
    const deck = useDeck()

    return (
      <div className="deck">
        <h3 style={{marginTop: 0}}> Deck List </h3>
        {deck.length > 0 && 
                    deck.map((card:CardData)=>{
                        return <Card card_data={card}/>
                    })
                }
      </div>
    );
  }
  
  export default Deck;