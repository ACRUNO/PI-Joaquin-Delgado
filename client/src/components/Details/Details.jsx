import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getBreedDetails } from "../../actions";



export default function BreedDetails(props) {

    const dispatch = useDispatch();
    const breedDetail = useSelector(state => state.breedDetail) 

    const { id } = useParams();

    useEffect(()=>{
        dispatch(getBreedDetails(id))
    }, []);

    return (
        <div>
            <Link to={`/dogs`}>
            <button>Back</button>
            </Link>
            <h1>BREED: {breedDetail.name}</h1>
            <img src={breedDetail.img}/>
            <p>WEIGHT: {breedDetail.weight_min} - {breedDetail.weight_max}kg</p>
            <p>LIFE SPAN: {breedDetail.life_span}</p>
            <span>HEIGHT: {breedDetail.height_min} - {breedDetail.height_max}cm</span>
            <ul>
                {breedDetail.temperament?.map(t => {
                    return ( <li>{t}</li>)
                })}
            </ul>
        </div>
    )
}
