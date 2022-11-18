import React from "react";
import { useDispatch } from "react-redux";
import { searchBreed, setCurrentPage } from "../../actions";

export default function SearchBar(){

    const dispatch = useDispatch();


    const handleChange = (e) => {
        e.preventDefault();
        dispatch(searchBreed(e.target.value));
        dispatch(setCurrentPage(1))
    }

    return(
        <div>
            <input type="text" placeholder="Breed..." onChange={e => handleChange(e)}></input>
        </div>
    )
}