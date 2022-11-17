import React from "react";
import './BreedCards.css';


export default function BreedCards({name, img, weight_max, weight_min, temperament}) {

    return(
        <div className="cards">
        <div className="card">
            <h2 className="title">{name}</h2>
            <img className="img" src={img} alt=''/>
            <span>Wehight: {weight_min} - {weight_max}kg</span>
            <ul className="temp">Temperaments:  
            {temperament?.map(t => {
                return (
                    <div className="temperaments">{t}</div>
                )
            })
            }
            </ul>
        </div>
        </div>
    )



}