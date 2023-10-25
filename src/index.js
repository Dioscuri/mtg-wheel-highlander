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
import { NewDeck } from './NewDeck.tsx';
import { decks } from './test_objects.tsx';

import { CardData } from './types.ts';
import { getCardData } from './helperFunctions.ts';

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
