import React from 'react';
import './App.css';
import { Navigation } from './Navigation.tsx';
import { Link } from 'react-router-dom';

function App() {
   function  test(){
    fetch(`http://localhost:5001/decks`)
      .then((response) =>response.json()) 
      .then((data) => console.log(data))
  }

  return (
    <div>
        <div className='homepage-banner'></div>

        <Navigation></Navigation>

        <div className='homepage-header'>
            <h1 style={{fontSize:"4rem"}}> MTG: Wheel Highlander </h1>
            <h2 style={{fontStyle:"italic", fontWeight:"normal", marginTop:0}}> 
                No such thing as too many cards. 
            </h2>
            <Link className="default-button" to={`/about`}> Find Out More </Link>

        </div>

        <div style={{
            zIndex: 100, 
            position:"relative", 
            height:"1800px", 
            borderTop:"solid 2px white", 
            backgroundColor:"var(--dark-theme-color)",
            color: "white",
        }}>
        </div>
    </div>
  );
}

export default App;
