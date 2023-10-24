import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

export function NewDeck() {
    // I am using useRef in order to prevent re-rendering the DOM
    // We only need the form info when we submit
    const navigate = useNavigate()

    // STATES
    const deck_name = useRef<HTMLInputElement>(null)
    // const wheels = useRef()

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
                .then((data) => console.log(data))
                .catch(error => {
                    window.alert(error);
                    return;
                });
        }
        catch (e){
            window.alert(e);
            return;
        }
        

        navigate("/new_deck");
    }

    return (
        <form className="new-deck-form" onSubmit={onSubmit}>
            <input 
                id = "new-deck-name"
                name="deck_name"
                placeholder="Deck Name"
                ref={deck_name}
            />
            <label htmlFor="new-deck-name"> Name </label>

            {/*<input 
                id ="wheel-selection"
                placeholder="Wheels"
            />
            <label htmlFor="wheel-selection"> TODO: Wheel Selection </label>
            */}

            <input type={"submit"} value="Create New Deck"/>
        </form>
    )
}