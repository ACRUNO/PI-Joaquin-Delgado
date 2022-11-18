import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creationFilter, getAllTemperaments, orderFilter, orderWeightFilter, setCurrentPage, temperamentsFilter } from "../../actions";


export default function Filters(){

    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments)

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

    const handleTemperamentsFilter = e => {
        dispatch(setCurrentPage(1));
        dispatch(temperamentsFilter(e.target.value));
    }

    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [dispatch]);

    return(
        <div>
            <div>
                <select defaultValue={"Alphabetic Order..."} onChange={(e) => handleOrderFilter(e)}>
                    <option disabled>Alphabetic Order...</option>
                    <option>A - Z</option>
                    <option>Z - A</option>
                </select>

                <select defaultValue={"Weight..."} onChange={(e) => handleWeightFilter(e)}>
                    <option disabled>Weight...</option>
                    <option>Less</option>
                    <option>More</option>
                </select>

                <select onChange={(e) => createdBreeds(e)}>
                    <option>All Breeds</option>
                    <option>Created</option>
                    <option>Existing</option>
                </select>

                <select onChange={e => handleTemperamentsFilter(e)}>
                    <option>All Temperaments</option>
                    {allTemperaments?.map(t => {
                        return (
                            <option key={t.name} value={t.name}>{t.name}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}