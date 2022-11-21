import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import './NavBar.css';


export default function Nav() {

    return (
        <div className="nav">
            <Link to="/dogs">
                <img className="imgs" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZYgnrw-fZBeqReiGyZ-GighKf9GbOL3rXA&usqp=CAU" alt="" />
            </Link>
            <div className="input">
                <div className="navsearch">
                    <SearchBar />
                </div>
                <Link className="btnsearch" to="/creation">
                    <button className="btnnav">Creation</button>
                </Link>
            </div>
        </div>
    )
}