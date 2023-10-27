// List of the wheel name, decks in the wheel
// Can be simpler than the decks showcase since each wheel will have so many decks

import React from "react";
import { useState, useEffect } from "react";

export function PersonalWheels() {
    const [wheels, setWheels] = useState<Array<any>>([])
    
    // Initialize the deck
    useEffect(() => {
        fetch(`http://localhost:5001/wheels`)
            .then((response) =>response.json()) 
            .then((data)=>{
                let results:Array<any> = []

                data.map((wheel) => {
                    results.push({
                        name: wheel.name,
                        id: wheel._id,
                        decks: wheel.decks
                    })
                })

                setWheels(results)
            })

            
        }, []) 

    return (
        <div>
            {wheels.map((wheel) => {
                return (
                    <div> {wheel.name} {wheel.decks} </div>
                )
            }) }

        </div>
    ) 
}