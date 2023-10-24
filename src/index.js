import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { Navigation } from './Navigation.tsx';
import { PersonalDecks } from './PersonalDecks.tsx';
import { DeckEditor } from './DeckEditor.tsx';

import { decks } from './test_objects.tsx';
import { NewDeck } from './NewDeck.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
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
        path: "deck_editor/:deckID",
        element: <DeckEditor/>,
        // TODO: REPLACE THE LOADER WITH ONE THAT GETS THE DECK FROM THE DATABASE
        // In addition, need to create the Map<string, CardData>
        //Create an new Map to pass
        // For now, hit the scryfall API for each card id in the cards array from the database
        // Use the card id as the string, and get the CardData from the response
        //TODO: Helper function that automatically gets the CardData from Scryfall's response
        loader: async({params}) => {
          return decks.find((deck) => deck.id == params.deckID)
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
        element: <div> Placeholder for Wheels page</div>,
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

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
