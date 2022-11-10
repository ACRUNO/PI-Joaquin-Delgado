import React from "react";




export default function BreedCards(props) {

    return(
        <div className="card">
            <h2 className="title">{props.name}</h2>
            <img className="img" src={props.img} alt=''/>
            <p>Wehight: {props.weight_max} - {props.weight_min}kg</p>
            <ul>
            {props.temperament?.map(t => {
                return (
                    <li>{t}</li>
                )
            })
            }
            </ul>
        </div>
    )



}