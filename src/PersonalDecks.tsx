import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

export function PersonalDecks(){
    const [decks, setDecks] = useState<Array<any>>([])
    
    // Initialize the deck
    useEffect(() => {
        fetch(`http://localhost:5001/decks`)
            .then((response) =>response.json()) 
            .then((data)=>{
                let results:Array<any> = []

                data.map((deck) => {
                    results.push({
                        name: deck.name,
                        id: deck._id,
                        cards: []
                    })
                })

                setDecks(results)
            })

            
        }, []) 
    
        
    return (
        <>
            <div className='personal-deck-container'>
                {decks.map((deck)=>{
                    const first_card = deck.cards.size == 0  ? null : (deck.cards.values().next().value)
                    const first_image_uri = (first_card == null || first_card.image_uris == undefined || first_card.image_uris.art_crop == undefined) ? null : first_card.image_uris.art_crop

                    return (
                        <Link 
                            className='personal-deck' 
                            style={{
                                background: (first_image_uri == null) ? "white" : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${first_image_uri})`,
                                color: (first_image_uri == null) ? "var(--dark-theme-color)" : "white",

                            }}
                            to={`/deck_editor/${deck.id}`}> {deck.name} 
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
