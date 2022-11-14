import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getAllBreeds, setCurrentPage } from "../../actions";
import BreedCards from '../BreedCards/BreedCards.jsx'
import Pagination from "../Pagination/Pagination";
import Nav from "../NavBar/NavBar.jsx";
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
    const previousPaginate = () => {
        if (currentPage > 1){    
        dispatch(setCurrentPage(currentPage-1))
        }
    }
    const nextPaginate = () => {
        if (currentPage < allBreeds.length/perPage){    
        dispatch(setCurrentPage(currentPage+1))
        }
    }
    return (
        <div className="cards">
            <Nav />
            <Pagination perPage = {perPage} totalBreeds = {allBreeds.length} paginate = {paginate} previousPaginate = {previousPaginate} nextPaginate = {nextPaginate} />
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