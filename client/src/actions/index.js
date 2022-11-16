import axios from 'axios';

export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED_DETAILS = "GET_BREED_DETAILS";
export const CREATE_BREED = "CREATE_BREED";
export const DELETE_BREED = "DELETE_BREED";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SEARCH_BREED = "SEARCH_BREED";
export const ORDER_FILTER = "ORDER_FILTER";
export const ORDER_WEIGHT_FILTER = "ORDER_WEIGHT_FILTER";
export const CREATION_FILTER = "CREATION_FILTER";



export const getAllBreeds = () => { return async dispatch => {
    try {
        let breeds = await axios.get("http://localhost:3001/dogs");
        console.log(breeds.data);
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: breeds.data
        })
    } catch (error) {
        alert(error);
    }
    }
}

export const getBreedDetails = (id) => async dispatch => {
    try {
        const breed = await axios.get(`http://localhost:3001/dogs/${id}`);
        console.log("detalles",breed.data[0]);
        return dispatch({
            type: GET_BREED_DETAILS,
            payload: breed.data[0]
        })
    } catch (error) {
        alert(error);
    }
}

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
}

export const searchBreed = (name) => async dispatch  => {
    try {
        let breed = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: SEARCH_BREED,
            payload: breed.data
        })
    } catch (error) {
        return dispatch({
            type: SEARCH_BREED,
            payload: []
        })
    }
}


export const orderFilter = value => {
    return {
        type: ORDER_FILTER,
        payload: value
    }
}

export const orderWeightFilter = value => {
    return {
        type: ORDER_WEIGHT_FILTER,
        payload: value
    }
}

export const creationFilter = value => {
    return {
        type: CREATION_FILTER,
        payload: value
    }
}