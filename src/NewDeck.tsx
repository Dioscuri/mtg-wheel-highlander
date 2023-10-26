import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

export function NewDeck() {
    const navigate = useNavigate()

    // STATES
    const deck_name = useRef<HTMLInputElement>(null)

    // FUNCTIONS
    async function onSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.target;
        const formData = JSON.stringify(Object.fromEntries(new FormData(form)));
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData
        }

        try {
            fetch("http://localhost:5001/decks/add", options)
                .then((response) =>response.json()) 
                .then((data) => {
                    console.log(data)
                    navigate(`/deck_editor/${data.insertedId}`);
                })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        }
        catch (e){
            window.alert(e);
            return;
        }
    }

    return (
        <form className="new-deck-form" onSubmit={onSubmit}>
            <h3> Add Deck </h3>
            <label htmlFor="new-deck-name"> Name </label>
            <input 
                id = "new-deck-name"
                name="deck_name"
                placeholder="Deck Name"
                ref={deck_name}
            />
            

            {/*<input 
                id ="wheel-selection"
                placeholder="Wheels"
            />
            <label htmlFor="wheel-selection"> TODO: Wheel Selection </label>
            */}

            <input className="submit-button" type={"submit"} value="Create New Deck"/>
        </form>
    )
}