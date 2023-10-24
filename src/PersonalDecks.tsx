import {decks} from './test_objects.tsx'
import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

export function PersonalDecks(){
    return (
        <>
            <div className='personal-deck-container'>
                {decks.map((deck)=>{
                    const first_card = deck.cards.size == 0  ? null : (deck.cards.values().next().value)
                    console.log(deck, first_card)

                    const first_image_uri = (first_card == null || first_card.image_uris == undefined || first_card.image_uris.art_crop == undefined) ? null : first_card.image_uris.art_crop
                    console.log(first_image_uri)

                    return (
                        <Link 
                            className='personal-deck' 
                            style={{
                                background: (first_image_uri == null) ? "linear-gradient(rgb(0,0,0, .9),rgb(0,0,0, .75), gray)" : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${first_image_uri})`
                            }}
                            to={`/deck_editor/${deck.id}`}> {deck.id} 
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
