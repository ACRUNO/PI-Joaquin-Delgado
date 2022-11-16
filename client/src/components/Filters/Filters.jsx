import React from "react";
import { useDispatch } from "react-redux";
import { creationFilter, orderFilter, orderWeightFilter, setCurrentPage } from "../../actions";


export default function Filters(){

    const dispatch = useDispatch();

    const handleOrderFilter= e =>{
        dispatch(orderFilter(e.target.value));
    }

    const handleWeightFilter = e => {
        dispatch(orderWeightFilter(e.target.value));
    }

    const createdBreeds = e => {
        dispatch(setCurrentPage(1))
        dispatch(creationFilter(e.target.value));
    }

    return(
        <div>
            <div>
                <select onChange={(e) => handleOrderFilter(e)}>
                    <option disabled selected>Alphabetic Order...</option>
                    <option>A - Z</option>
                    <option>Z - A</option>
                </select>

                <select onChange={(e) => handleWeightFilter(e)}>
                    <option disabled selected>weight...</option>
                    <option>Less</option>
                    <option>More</option>
                </select>

                <select onChange={(e) => createdBreeds(e)}>
                    <option>All</option>
                    <option>Created</option>
                    <option>Existing</option>
                </select>
            </div>
        </div>
    )
}