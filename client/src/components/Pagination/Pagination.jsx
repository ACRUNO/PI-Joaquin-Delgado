import React from "react";

export default function Pagination({perPage, totalBreeds, paginate}) {

    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalBreeds/perPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul>
                {pageNumbers.map(n =>(
                    <li>
                        <button onClick={() => paginate(n)}>{n}</button>    
                    </li>
                )
                )}
            </ul>
        </div>
    )

} 