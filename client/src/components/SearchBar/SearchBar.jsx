import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBreed, setCurrentPage } from "../../actions";

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (value) => {
        // value.preventDefault();
        setName(value);
        dispatch(searchBreed(value));
        dispatch(setCurrentPage(1))
    }

    // const handleSubmit = value => {
    //     // dispatch(searchBreed(value));
    //     // dispatch(setCurrentPage(1))
    // }

    return(
        <div>
            <input type="text" placeholder="Breed..." onChange={e => handleChange(e.target.value)}></input>
            {/* <button onClick={()=> handleSubmit(name)}>Search</button> */}
        </div>
    )
}