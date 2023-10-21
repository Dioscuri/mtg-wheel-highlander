import React from "react"
import { useRouteError } from "react-router-dom";


export function ErrorBoundary(){
    const error:any = useRouteError();
    return (
        <div> ERROR: {error.statusText || error.message} </div>
    )
}