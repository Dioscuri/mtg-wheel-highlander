import { useState } from "react"
import { CardData } from "./types"
import React from "react"
import { useContext } from "react"

const DeckContext = React.createContext<CardData[]>([])
const DeckUpdateContext = React.createContext<Function>(()=>{})

export function useDeck(){
    return useContext(DeckContext)
}

export function useDeckUpdate(){
    return useContext(DeckUpdateContext)
}

export function DeckProvider({children}){
    const [deck, setDeck] = useState<CardData[]>([])

    function updateDeck(update:CardData[]){
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