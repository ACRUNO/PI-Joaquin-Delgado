import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"



export default function Landing(){
    return (
    <Link to='/dogs'>
        <button>Henry Dogs</button>
    </Link>
    )
}