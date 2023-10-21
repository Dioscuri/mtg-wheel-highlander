import React from "react";
import { DeckProvider } from "./DeckContext.tsx";
import Search from "./Search.tsx";
import Deck from "./Deck.tsx";
import { useLoaderData } from "react-router-dom";

export function DeckEditor(){
    const deck = useLoaderData()

    return (
        <div className="App">
            <DeckProvider initial_deck={deck}>
                <Deck/>
                <Search/>
            </DeckProvider>
        </div>
    )
}