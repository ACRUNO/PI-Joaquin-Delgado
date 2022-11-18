import { GET_ALL_BREEDS, GET_BREED_DETAILS, CREATE_BREED, SET_CURRENT_PAGE, SEARCH_BREED, ORDER_FILTER, ORDER_WEIGHT_FILTER, CREATION_FILTER, GET_ALL_TEMPERAMENTS, TEMPERAMENTS_FILTER, CLEAR_BREED_DETAIL, SET_LOADING } from "../actions/index.js";

const initialState = {
    allBreeds: [],
    breeds: [],
    temperaments: [],
    breedDetail: [],
    page: 1,
    loading: true
}


function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_BREEDS:
            console.log("reducer", action.payload);
            return {...state, breeds: action.payload, allBreeds: action.payload, loading: false}
        
        case GET_BREED_DETAILS:
            return {...state, breedDetail: action.payload}

        case CLEAR_BREED_DETAIL:
            return {...state, breedDetail: action.payload}
        
        case SET_CURRENT_PAGE:
            return {...state, page: action.payload}

        case SEARCH_BREED: 
            return {...state, breeds: action.payload}

        case GET_ALL_TEMPERAMENTS: 
            return {...state, temperaments: action.payload}

        case SET_LOADING:
            console.log("reducer",action.payload);
            return{...state, loading: action.payload}

        case CREATE_BREED:
            return {...state}

        case ORDER_FILTER:
            let sorted = [...state.breeds];
            sorted = sorted.sort((a , b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === "A - Z" ? 1 : -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === "Z - A" ? 1 : -1;
                return -1
            })
            return {...state, breeds: sorted}
        
        case ORDER_WEIGHT_FILTER:
            let weight_sorted = [...state.breeds];

            weight_sorted = weight_sorted.sort((a , b) => {
                if(a.weight_max > b.weight_max) return action.payload === "Less" ? 1 : -1;
                if(a.weight_max < b.weight_max) return action.payload === "More" ? 1 : -1;
                return -1;
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
            if (action.payload === "All Breeds") creation_filter = [...state.allBreeds];
            return {...state, breeds: creation_filter}

        case TEMPERAMENTS_FILTER:
            let allTemperamentsBreeds = [...state.allBreeds];
            if (action.payload === "All Temperaments") return {...state, breeds: allTemperamentsBreeds}
            let filteredTemperaments = allTemperamentsBreeds.filter(b => b.temperament?.includes(action.payload));
            return {...state, breeds: filteredTemperaments}

        default: return { ...state }
    }
}

export default rootReducer;