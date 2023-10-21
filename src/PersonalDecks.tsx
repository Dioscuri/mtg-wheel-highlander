import {decks} from './test_objects.tsx'
import React from 'react'
import { Link } from 'react-router-dom'

export function PersonalDecks(){
    return (
        <>
            <div>
                {decks.map((deck)=>{
                    return <Link to={`/deck_editor/${deck.id}`}> {deck.id} </Link>
                })}
            </div>
        </>
    )
}
