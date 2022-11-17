import React from "react";
import "./Pagination.css";

export default function Pagination({perPage, totalBreeds, paginate, previousPaginate, nextPaginate}) {

    const pageNumbers = [];

    for(let i=1 ; i <= Math.ceil(totalBreeds/perPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul>
                <li className="pages">
                    <button onClick={() => previousPaginate()}>{"<<"}</button>
                    {pageNumbers.map(n =>(
                        <button className="" onClick={() => paginate(n)}>{n}</button>    
                        )
                    )}
                    <button onClick={() => nextPaginate()}>{">>"}</button>
                </li>
            </ul>
        </div>
    )

} 