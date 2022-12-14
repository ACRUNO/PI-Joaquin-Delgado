import React from "react";
import { useSelector } from "react-redux";
import "./Pagination.css";

export default function Pagination({perPage, totalBreeds, paginate, previousPaginate, nextPaginate}) {

    const pageNumbers = [];
    const active = useSelector(state => state.page);

    for(let i=1 ; i <= Math.ceil(totalBreeds/perPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul>
                <li className="pages">
                    <button className="btt" onClick={() => previousPaginate()}>{"<<"}</button>

                    {pageNumbers.map(n =>(
                        <button key={n} className={active===n ? "active" : "btt"} onClick={() => paginate(n)}>{n}</button>    
                        )
                    )}
                    <button className="btt" onClick={() => nextPaginate()}>{">>"}</button>
                </li>
            </ul>
        </div>
    )

} 