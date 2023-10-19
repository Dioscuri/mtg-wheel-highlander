import { useState, useContext } from "react"
import { CardData } from "./types"
import React from "react"

const DeckContext = React.createContext<Map<string, CardData>>(new Map())
const DeckUpdateContext = React.createContext<Function>(()=>{})

export function useDeck(){
    return useContext(DeckContext)
}

export function useDeckUpdate(){
    return useContext(DeckUpdateContext)
}

export function DeckProvider({children}){
    const [deck, setDeck] = useState<Map<string, CardData>>(new Map())

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