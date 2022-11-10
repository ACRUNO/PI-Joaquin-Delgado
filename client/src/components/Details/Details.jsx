import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getBreedDetails } from "../../actions";



export default function BreedDetails(props) {

    const dispatch = useDispatch();
    const breedDetails = useSelector(state => state.breedDetail) 

    const { id } = useParams();

    useEffect(()=>{
        dispatch(getBreedDetails(id))
    }, []);
    console.log(breedDetails);

    return (
        <div>
            <h1>BREED: {breedDetails.name}</h1>
            <img src={breedDetails.img}/>
            <p>MIN WEIGHT: {breedDetails.weight_min}</p>
            <p>MAX WEIGHT: {breedDetails.weight_max}</p>
            <p>LIFE SPAN: {breedDetails.life_span}</p>
            <p>MIN HEIGHT: {breedDetails.height_min}</p>
            <p>MAX HEIGHT: {breedDetails.height_max}</p>
        </div>
    )
}
