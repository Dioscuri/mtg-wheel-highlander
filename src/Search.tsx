import './App.css';
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import { CardData } from './types';
import Card from './Card.tsx';
import { useDeck } from './DeckContext.tsx';

const WAIT_TIME = 65;

function Search() {
    // STATES
    const [searchResults, setSearchResults] = useState(Array<CardData>)
    const [searchInput, setSearchInput] = useState("")
    const inputTimer = useRef<NodeJS.Timeout|null>(null)

    // CONTEXT
    const deck = useDeck()

    // USE EFFECTS 
    // ON CHANGE IN INPUT
    useEffect(() => {
        if (inputTimer.current){
            clearTimeout(inputTimer.current)
        }
        
        // Set a timer before calling the API to get the auto-completed list
        inputTimer.current = setTimeout(() => {
            autoFillList()
        },WAIT_TIME)

    },[searchInput])

    // HELPER FUNCTIONS
    function autoFillList(){
        if (searchInput != ""){

            const input_string = searchInput

            fetch(`https://api.scryfall.com/cards/autocomplete?q=${input_string}`)
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    let results:Array<CardData> = []

                    for (let i = 0; i < response.data.length ; i++){

                        setTimeout(()=>
                            fetch(`https://api.scryfall.com/cards/named?fuzzy=${response.data[i]}`)
                                .then((response) => {
                                    return response.json()
                                })
                                .then((data)=>{
                                    let card:CardData = {
                                        id: data.id,
                                        uri: data.uri,
                                        cmc:data.cmc,
                                        colors:data.colors,
                                        name: data.name,
                                        type_line: data.type_line,
                                        image_uris: data.image_uris
                                    }
                                    results.push(card)
                                })
                        , WAIT_TIME) 
                    }

                    // Set timeout to set the state since we need to wait for the above callbacks to finish
                    setTimeout(() => setSearchResults(results), response.data.length * WAIT_TIME + WAIT_TIME)
                })
                .catch(err => console.log(err))
        }

    }


    return (
        <div className="Search">
            <input onChange={(e) => setSearchInput(e.target.value)}></input>
            <button onClick={autoFillList}>Search</button>
            <div>
                {(searchResults.length != 0) && 
                    <ul>
                        {
                            searchResults.map((card:CardData)=>{
                                return <Card card_data={card}/>
                            })
                        }
                    </ul>}
            </div>
            <div>
                {deck.length > 0 && 
                    deck.map((card:CardData)=>{
                        return <div>{card.name}</div>
                    })
                }
            </div>
        </div>
    );
}

export default Search;