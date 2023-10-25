import './App.css';
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import { CardData } from './types.ts';
import Card from './Card.tsx';
import { getCardData } from './helperFunctions.ts';

const WAIT_TIME = 65;

function Search() {
    // STATES
    const [searchResults, setSearchResults] = useState(Array<CardData>)
    const [searchInput, setSearchInput] = useState("")
    const inputTimer = useRef<NodeJS.Timeout|null>(null)

    // USE EFFECTS 
    // ON CHANGE IN INPUT
    // TODO: FIX SO THAT EMPTY SEARCH WILL CLEAR THE RESULTS
    useEffect(() => {
        if (inputTimer.current){
            clearTimeout(inputTimer.current)
        }
        
        // Set a timer before calling the API to get the auto-completed list
        inputTimer.current = setTimeout(() => {
            autoFillList()
        },WAIT_TIME * 5)

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
                                    results.push(getCardData(data))
                                })
                        , WAIT_TIME) 
                    }

                    // Set timeout to set the state since we need to wait for the above callbacks to finish
                    setTimeout(() => setSearchResults(results), response.data.length * WAIT_TIME + WAIT_TIME)
                })
                .catch(err => console.log(err))
        }
        else{
            setTimeout(() => setSearchResults([]),  WAIT_TIME)
        }
    }


    return (
        <div className="search-container">
            <input 
                className="search-bar" 
                placeholder='Search for cards here'
                onChange={(e) => setSearchInput(e.target.value)}
            />
          
            <div>
                {(searchResults.length != 0) && 
                    <div>
                        <ul>
                            {
                                searchResults.map((card:CardData)=>{
                                    return <li key={card.id}><Card card_data={card}/></li>
                                })
                            }
                        </ul>
                        {searchResults.length > 10 &&
                            <div className='card' style={{fontStyle:"italic", fontSize:"smaller"}}> . . . Scroll for more results </div>
                        }
                    </div>
                    }
            </div>
        </div>
    );
}

export default Search;