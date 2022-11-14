import { GET_ALL_BREEDS, GET_BREED_DETAILS, CREATE_BREED, DELETE_BREED, SET_CURRENT_PAGE, SEARCH_BREED } from "../actions/index.js";

const initialState = {
    breeds: [],
    temperaments: [],
    breedDetail: {},
    page: 1,
    search: []
}


function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_BREEDS:
            return {...state, breeds: action.payload}
        
        case GET_BREED_DETAILS:
            return {...state, breedDetail: action.payload}
        
        case SET_CURRENT_PAGE:
            return {...state, page: action.payload}

        case SEARCH_BREED: 
            return {...state, breeds: action.payload}

        default: return { ...state }
    }
}

export default rootReducer;