import axios from 'axios';

export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED_DETAILS = "GET_BREED_DETAILS";
export const CREATE_BREED = "CREATE_BREED";
export const DELETE_BREED = "DELETE_BREED";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";



export const getAllBreeds = () => { return async dispatch => {
    try {
        let breeds = await axios.get("http://localhost:3001/dogs");
        console.log(breeds);
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
        return dispatch({
            type: GET_BREED_DETAILS,
            payload: breed.data
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