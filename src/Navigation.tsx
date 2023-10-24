import React from "react";
import { Outlet, Link } from "react-router-dom";

export function Navigation(){
    return (
    <div>
        <nav className="navigation">
            <Link to={``}>Home</Link>
            <Link to={`/wheels`}>Your Wheels</Link>
            <Link to={`/decks`}>Your Decks</Link>
        </nav>
        <div>
            <Outlet></Outlet>
        </div>
    </div>)
}