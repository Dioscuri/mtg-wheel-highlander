import React, { useEffect, useState } from "react";
import { DeckProvider } from "./DeckContext.tsx";
import Search from "./Search.tsx";
import Deck from "./Deck.tsx";
import { useLoaderData } from "react-router-dom";

export function DeckEditor(){
    const loadedData:any = useLoaderData() //TODO: Define return type    

    return (
        <div style={{marginTop:"1rem"}}>
            <div className="deck-editor-header">
                <h2 style={{textTransform:"uppercase"}}> {loadedData.name}</h2>
                <h3> User Name </h3>
            </div>
            <div className="App">
                
                <DeckProvider loadedData={loadedData}>
                    <Deck/>
                    <Search/>
                </DeckProvider>
            </div>
        </div>
    )
}