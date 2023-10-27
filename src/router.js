
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
  
import App from './App.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { Navigation } from './Navigation.tsx';
import { PersonalDecks } from './PersonalDecks.tsx';
import { DeckEditor } from './DeckEditor.tsx';
import { NewDeck } from './NewDeck.tsx';
import { PersonalWheels } from './PersonalWheels.tsx'; 
import { About } from "./About.tsx";

export const router = createBrowserRouter([
    {
      index: true,
      element: <Navigate to={"/home"} replace/>,
      errorElement: <ErrorBoundary />,
    },
    {
      path:"/home",
      element:<App/>,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/",
      element: <Navigation/>,
      errorElement: <ErrorBoundary />,
      children: [
        {
            path:"/about",
            element: <About/>
        },
        {
          path: "deck_editor/:deckID",
          element: <DeckEditor/>,
  
          loader: async({params}) => {
            // Fetch the deck from the database
            // Returns a promise with the parsed data
            let deck = new Map()
  
            return fetch(`http://localhost:5001/decks/${params.deckID}`)
              .then((response) => response.json())
              
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "wheel_editor",
          element: <App/>,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "decks",
          element: <PersonalDecks/>,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "wheels",
          element: <PersonalWheels/>,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/new_deck",
          element: <NewDeck/>,
          errorElement: <ErrorBoundary />,
        },
      ]
    }
  ]);
  
  export default router;