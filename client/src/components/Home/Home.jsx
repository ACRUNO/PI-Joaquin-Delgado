import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getAllBreeds } from "../../actions";
import BreedCards from '../BreedCards/BreedCards.jsx'
import './Home.css';


export default function Breeds(props){

    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds) 

    useEffect(() => {
        dispatch(getAllBreeds())
    }, []);

    console.log(breeds)
    return (
        <div className="cards">
        {breeds?.map(b=>{
            return (
                <Link to={`/dogs/${b.id}`}>
                    <BreedCards 
                        key = {b.id}
                        name = {b.name}
                        img = {b.img}
                        weight_max = {b.weight_max}
                        weight_min = {b.weight_min}
                        temperament = {b.temperament}
                    />
                    
                </Link>
                )
        })}
        
        </div>
    )
}