import { GET_ALL_BREEDS, GET_BREED_DETAILS, CREATE_BREED, DELETE_BREED } from "../actions/index.js";

const initialState = {
    breeds: [],
    temperaments: [],
    breedDetail: {}
}


function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_BREEDS:
            return {...state, breeds: action.payload}
        
        case GET_BREED_DETAILS:
            return {...state, breedDetail: action.payload}

        default: return { ...state }
    }
}

export default rootReducer;