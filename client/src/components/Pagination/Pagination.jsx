import React from "react";

export default function Pagination({perPage, totalBreeds, paginate, previousPaginate, nextPaginate}) {

    const pageNumbers = [];

    for(let i=1 ; i <= Math.ceil(totalBreeds/perPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul>
                <li>
                    <button onClick={() => previousPaginate()}>Prev</button>
                    {pageNumbers.map(n =>(
                        <button className="" onClick={() => paginate(n)}>{n}</button>    
                        )
                    )}
                    <button onClick={() => nextPaginate()}>Next</button>
                </li>
            </ul>
        </div>
    )

} 