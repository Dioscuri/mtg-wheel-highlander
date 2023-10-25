import { useState, useContext, useEffect } from "react"
import { CardData } from "./types"
import React from "react"
import { getCardData } from "./helperFunctions.ts"

const DeckContext = React.createContext<Map<string, CardData>>(new Map())
const DeckUpdateContext = React.createContext<Function>(()=>{})

export function useDeck(){
    return useContext(DeckContext)
}

export function useDeckUpdate(){
    return useContext(DeckUpdateContext)
}

export function DeckProvider({loadedData, children}){
    const [deck, setDeck] = useState<Map<string, CardData>>(new Map<string, CardData>)
    
    // Initialize the deck
    useEffect(() => {
        let results:Map<string, CardData> = new Map<string, CardData> ()

        for (let i = 0; i < loadedData.cards.length ; i++){    
            setTimeout(()=>
                fetch(`https://api.scryfall.com/cards/${loadedData.cards[i]}`)
                    .then((response) => {
                        return response.json()
                    })
                    .then((data)=>{
                        results.set(getCardData(data).id,getCardData(data))
                    })
            , 65) 
            }
    
            // Set timeout to set the state since we need to wait for the above callbacks to finish
        setTimeout(() => setDeck(results), loadedData.cards.length * 65 + 65)
        
        }, []) 
    
        
    

    function updateDeck(update:Map<string, CardData>){
        setDeck(update)
    }

    return (
        <DeckContext.Provider value = {deck}>
            <DeckUpdateContext.Provider value={updateDeck}>
                {children}
            </DeckUpdateContext.Provider>
        </DeckContext.Provider>
    )
}