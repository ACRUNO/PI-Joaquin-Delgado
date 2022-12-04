import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creationFilter, getAllTemperaments, orderFilter, orderWeightFilter, setCurrentPage, temperamentsFilter, yearFilter } from "../../actions";
import './Filter.css';

export default function Filters() {

    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments)

    const handleOrderFilter = e => {
        dispatch(orderFilter(e.target.value));
        const weight = document.getElementById('weight');
        weight.selectedIndex = 0;        
    }

    const handleWeightFilter = e => {
        dispatch(orderWeightFilter(e.target.value));
        const alphabetic = document.getElementById('alphabetic');
        alphabetic.selectedIndex = 0;
    }

    const createdBreeds = e => {
        dispatch(setCurrentPage(1))
        dispatch(creationFilter(e.target.value));
        const weight = document.getElementById('weight');
        weight.selectedIndex = 0;  
        const alphabetic = document.getElementById('alphabetic');
        alphabetic.selectedIndex = 0;
        const temps = document.getElementById('temps');
        temps.selectedIndex = 0;
    }

    const handleTemperamentsFilter = e => {
        dispatch(setCurrentPage(1));
        dispatch(temperamentsFilter(e.target.value));
        const weight = document.getElementById('weight');
        weight.selectedIndex = 0;  
        const alphabetic = document.getElementById('alphabetic');
        alphabetic.selectedIndex = 0;
        const breeds = document.getElementById('breeds');
        breeds.selectedIndex = 0;
    }   

    const handleClick = e => {
        e.preventDefault();
        dispatch(yearFilter(10));
    }


    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [dispatch]);

    return (
        <div className="cont">
            <div className="filter">
                <div className="selects">
                    <select id="alphabetic" defaultValue={"Alphabetic Order..."} onChange={(e) => handleOrderFilter(e)}>
                        <option disabled>Alphabetic Order...</option>
                        <option>A - Z</option>
                        <option>Z - A</option>
                    </select>
                </div>

                <div className="selects">
                    <select id="weight" defaultValue={"Weight..."} onChange={(e) => handleWeightFilter(e)}>
                        <option disabled>Weight...</option>
                        <option>Less</option>
                        <option>More</option>
                    </select>
                </div>

                <div className="selects">
                    <select id="breeds" onChange={(e) => createdBreeds(e)}>
                        <option>All Breeds</option>
                        <option>Created</option>
                        <option>Existing</option>
                    </select>
                </div>

                <div className="selects">
                    <select id="temps" onChange={e => handleTemperamentsFilter(e)}>
                        <option>All Temperaments</option>
                        {allTemperaments?.map(t => {
                            return (
                                <option key={t.name} value={t.name}>{t.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <button onClick={e => handleClick(e)}>Breed higher than 10 years</button>
                </div>
            </div>
        </div>
    )
}