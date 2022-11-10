import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom";
import './Landing.css';



export default function Landing(){
    return (
    <div className="page">
        <div className="loader">
            <Link to='/dogs'>
                <button className="button">Welcome to Henry Dogs!</button>
            </Link>
        </div>
    </div>
    )
}