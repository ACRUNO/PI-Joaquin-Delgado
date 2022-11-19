import React from "react";
import './BreedCards.css';


export default function BreedCards({ name, img, weight_max, weight_min, temperament, id }) {

    return (
        // <div key={id} className="container">
        <div className="card">
            <h2 className="title">{name}</h2>
            <img className="img" src={img} alt='' />
            <span className="weight">Wehight: {weight_min} - {weight_max}kg</span>
            <div className="containertemp">
                <div key={id} className="temperaments">
                    <span className="temp">
                        Temperaments:
                    </span>
                    <span className="temp2">
                        {temperament?.map(t => `${t}`).join(', ')}
                    </span>
                </div>
            </div>
        </div>
    )



}