import { GET_ALL_BREEDS, GET_BREED_DETAILS, CREATE_BREED, DELETE_BREED, SET_CURRENT_PAGE, SEARCH_BREED, ORDER_FILTER, ORDER_WEIGHT_FILTER, CREATION_FILTER } from "../actions/index.js";

const initialState = {
    allBreeds: [],
    breeds: [],
    temperaments: [],
    breedDetail: [],
    page: 1,
}


function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_BREEDS:
            return {...state, breeds: action.payload, allBreeds: action.payload}
        
        case GET_BREED_DETAILS:
            return {...state, breedDetail: action.payload}
        
        case SET_CURRENT_PAGE:
            return {...state, page: action.payload}

        case SEARCH_BREED: 
            return {...state, breeds: action.payload}

        case ORDER_FILTER:
            let sorted = [...state.allBreeds];
            console.log(sorted);
            sorted = sorted.sort((a , b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === "A - Z" ? 1 : -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === "Z - A" ? 1 : -1;
                
            })
            return {...state, breeds: sorted}
        
        case ORDER_WEIGHT_FILTER:
            let weight_sorted = [...state.allBreeds];

            weight_sorted = weight_sorted.sort((a , b) => {
                if(a.weight_max > b.weight_max) return action.payload === "Less" ? 1 : -1;
                if(a.weight_max < b.weight_max) return action.payload === "More" ? 1 : -1;
                
            })
            return {...state, breeds: weight_sorted}

        case CREATION_FILTER:
            let allBreeds = [...state.allBreeds];
            let creation_filter;
            if (action.payload === "Created") creation_filter = allBreeds.filter(c => c.id.toString().length === 36 )
            // creation_filter = action.payload === "Created" && allBreeds.filter(c => c.id.toString().length === 36 );
            // creation_filter = action.payload === "Existing" && allBreeds.filter(c => c.id.toString().length < 36 );
            if (action.payload === "Existing") creation_filter = allBreeds.filter(c => c.id.toString().length < 36 );
            // creation_filter = action.payload === "All" && allBreeds;
            if (action.payload === "All") creation_filter = allBreeds;
            console.log(creation_filter);

            return {...state, breeds: creation_filter}

        default: return { ...state }
    }
}

export default rootReducer;