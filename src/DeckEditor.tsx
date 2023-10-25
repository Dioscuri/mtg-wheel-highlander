import React, { useEffect, useState } from "react";
import { DeckProvider } from "./DeckContext.tsx";
import Search from "./Search.tsx";
import Deck from "./Deck.tsx";
import { useLoaderData } from "react-router-dom";

export function DeckEditor(){
    const loadedData:any = useLoaderData() //TODO: Define return type    

    return (
        <div>
            <h3 style={{width:"100%", textAlign:"center"}}> {loadedData.name}</h3>
            <div className="App">
                
                <DeckProvider loadedData={loadedData}>
                    <Deck/>
                    <Search/>
                </DeckProvider>
            </div>
        </div>
    )
}