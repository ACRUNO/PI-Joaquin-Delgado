import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getAllBreeds, setCurrentPage } from "../../actions";
import BreedCards from '../BreedCards/BreedCards.jsx'
import Pagination from "../Pagination/Pagination";
import './Home.css';


export default function Breeds(props){

    const dispatch = useDispatch();
    const allBreeds = useSelector(state => state.breeds) 
    const currentPage = useSelector(state => state.page) 
    const [perPage] = useState(8);
    const lastBreed = currentPage * perPage;
    const firstBreed = lastBreed - perPage;
    
    const breeds = allBreeds.slice(firstBreed, lastBreed);

    useEffect(() => {
        dispatch(getAllBreeds())
    }, []);

    const paginate = page => dispatch(setCurrentPage(page));


    return (
        <div className="cards">
        <Pagination perPage = {perPage} totalBreeds = {allBreeds.length} paginate = {paginate} />
        {breeds?.map(b=>{
            return (
                <Link to={`/dogs/${b.id}`} style={{ textDecoration: 'none' }}>
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