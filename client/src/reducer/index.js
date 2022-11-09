

const initialState = {
    breeds: [],
    temperaments: []
}


function rootReducer(state = initialState, actions) {
    console.log('soy el reducer', state);
}

export default rootReducer;